import UserDAO from '../../DAO/UserDAO';

export const findProfile = async (id: number) => {
  if (!id) {
    throw new Error('query없음');
  }
  const user = await UserDAO.getProfile(id);
  if (user === null) {
    throw new Error('user가 존재하지 않습니다.');
  }
  return user;
};
