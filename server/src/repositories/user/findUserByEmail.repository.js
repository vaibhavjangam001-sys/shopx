import { User } from '../../models/index.js';

const findUserByEmailRepository = (email) => {
  return User.findOne({ email });
};

export default findUserByEmailRepository;
