import FriendDAO from '../../DAO/FriendDAO';
import { FriendController } from '../../controllers/FriendController';

export const deleteFriend = async (userId: number, subId: number) => {
  await FriendDAO.deleteFriend(userId, subId);
};
