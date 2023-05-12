import FriendDAO from '../../DAO/FriendDAO';
import UserDAO from '../../DAO/UserDAO';
import ErrorStatus from '../../utils/ErrorStatus';

export const addFriend = async (userId: number, subId: number) => {
  const user = await UserDAO.getProfile(userId);
  const subUser = await UserDAO.getProfile(subId);
  if (user && subUser) {
    await FriendDAO.addFriend(userId, subId);
  } else {
    throw new ErrorStatus('user를 찾을 수 없습니다', 400);
  }
};
