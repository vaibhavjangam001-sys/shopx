import { User } from '../../models/index.js';

const findUserByIdRepository = (userId) => {
  return User.findById(userId);
};

export default findUserByIdRepository;
