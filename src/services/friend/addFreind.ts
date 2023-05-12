import FriendDAO from '../../DAO/FriendDAO';
import UserDAO from '../../DAO/UserDAO';

export const addFriend = async (userId: number, subId: number) => {
  const user = await UserDAO.getProfile(userId);
  const subUser = await UserDAO.getProfile(subId);
  if (user && subUser) {
    await FriendDAO.addFriend(userId, subId);
    return 1;
  }
  return 0;
};
