import { getAllUsersRepository } from '../../repositories/user/index.js';

const getAllUsersService = async () => {
  const users = await getAllUsersRepository();

  return users;
};

export default getAllUsersService;
