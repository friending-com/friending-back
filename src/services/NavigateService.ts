import FriendDAO from '../DAO/FriendDAO';
import ProfileDAO from '../DAO/ProfileDAO';
import { Queue } from '../utils/dataStructure/Queue';

export class NavigateService {
  //덜됨
  static async navigate(userProfileId: number, findProfileId: number) {
    const friends = await FriendDAO.selectAll();
    const profile = (await ProfileDAO.selectAll()).map((profile) => profile.id);
    const edges = {};
    const visited = Array.from({ length: profile.length + 1 }, () => 0);
    profile.forEach((profileId) => (edges[profileId] = new Set()));
    friends.forEach((friend) =>
      edges[friend.profileId_1].add(friend.profileId_2)
    );
    const queue = new Queue();
    queue.enqueue(userProfileId);
    const result = [];
    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      console.log(edges[current]);
      for (const next of edges[current]) {
        if (visited[next] == 0) {
          visited[next] = 1;
          queue.enqueue(next);
          result.push(next);
        }
      }
      if (visited[findProfileId] == 1) {
        break;
      }
    }
    console.log(result);
  }
}
