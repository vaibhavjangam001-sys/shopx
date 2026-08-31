import { User } from '../../models/index.js';

const getAllUsersRepository = () => {
  return User.find();
};

export default getAllUsersRepository;
