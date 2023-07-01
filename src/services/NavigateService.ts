import FriendDAO from '../DAO/FriendDAO';
import ProfileDAO from '../DAO/ProfileDAO';
import { Queue } from '../utils/dataStructure/Queue';

export class NavigateService {
  //덜됨
  static async navigate(userProfileId: number, findProfileId: number) {
    const friends = await FriendDAO.selectAll();
    const profiles = await ProfileDAO.selectAll();
    const profileSortedById = [];
    profiles.forEach((profile) => {
      profileSortedById[profile.id] = profile;
    });
    const profileIds = profiles.map((profile) => profile.id);
    const edges = {};
    const visited = Array.from({ length: profileIds.length + 1 }, () => 0);
    profileIds.forEach((profileId) => (edges[profileId] = new Set()));
    friends.forEach((friend) =>
      edges[friend.profileId_1].add(friend.profileId_2)
    );
    const queue = new Queue();
    queue.enqueue(userProfileId);
    visited[userProfileId] = 1;
    const result = [];
    result.push(userProfileId);
    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      edges[current].forEach((next) => {
        if (visited[next] == 0 && profileSortedById[next].isPublic) {
          visited[next] = 1;
          queue.enqueue(next);
          result.push(next);
        }
      });
      if (visited[findProfileId] === 1) {
        break;
      }
    }
    if (visited[findProfileId] === 1) return result;
    else undefined;
  }
}
