import { User } from '../../models/index.js';

const findUserByEmailForLoginRepository = async (email) => {
  return User.findOne({ email }).select('+password');
};

export default findUserByEmailForLoginRepository;
