import { User } from '../../models/index.js';

const registerUserRepository = (userData) => {
  return User.create(userData);
};

export default registerUserRepository;
