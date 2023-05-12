import FriendDAO from '../../DAO/FriendDAO';
import UserDAO from '../../DAO/UserDAO';

export const showFriend = async (userId: number) => {
  const user = await UserDAO.getProfile(userId);
  if (!user) {
    throw new Error('user가 존재하지 않습니다');
  }
  const friendList = await FriendDAO.getFriendList(userId);
  const result = await Promise.all(
    friendList.map(async (friend) => await UserDAO.getProfile(friend))
  );
  return result;
};
