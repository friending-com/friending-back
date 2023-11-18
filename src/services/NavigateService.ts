import FriendDAO from '../DAO/FriendDAO';
import { GroupDAO } from '../DAO/GroupDAO';
import ProfileDAO from '../DAO/ProfileDAO';
import { Queue } from '../utils/dataStructure/Queue';

export class NavigateService {
  static async navigate(userProfileId: number, findProfileId: number) {
    const userGroup = await ProfileDAO.getGroup(userProfileId);
    const findProfileGroup = await ProfileDAO.getGroup(findProfileId);
    if (userGroup.id !== findProfileGroup.id) undefined;

    const { profiles: profiles } = await GroupDAO.getGroup(userGroup.id);
    const friends = await FriendDAO.selectAll();
    const profileSortedById = [];
    profiles.forEach((profile) => {
      profileSortedById[profile.id] = profile;
    });

    const profileIds = profiles.map((profile) => profile.id);
    const edges = {};
    const visited = new Set();
    profileIds.forEach((profileId) => (edges[profileId] = new Set()));
    friends.forEach((friend) => {
      edges[friend.profileId_1] &&
        edges[friend.profileId_1].add(friend.profileId_2);
      edges[friend.profileId_2] &&
        edges[friend.profileId_2].add(friend.profileId_1);
    });
    const queue = new Queue();
    queue.enqueue([userProfileId]);
    visited.add(userProfileId);
    while (!queue.isEmpty()) {
      const currentPath = queue.dequeue();
      const current = currentPath[currentPath.length - 1];
      if (current === findProfileId)
        return currentPath.map((id) => profileSortedById[id]);
      edges[current].forEach((next) => {
        if (!visited.has(next) && profileSortedById[next].isPublic) {
          visited.add(next);
          queue.enqueue([...currentPath, next]);
        }
      });
    }
    return undefined;
  }
}
