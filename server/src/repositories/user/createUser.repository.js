import { User } from '../../models/index.js';

const createUserRepository = (userData) => {
  return User.create(userData);
};

export default createUserRepository;
