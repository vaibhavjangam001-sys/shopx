import { User } from '../../models/index.js';

const findUserByIdRepository = (userId) => {
  return User.findById(userId).select('-password');
};

export default findUserByIdRepository;
