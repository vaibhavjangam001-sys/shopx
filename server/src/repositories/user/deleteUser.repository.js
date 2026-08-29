import { User } from '../../models/index.js';

const deleteUserRepository = async (userId) => {
  return User.findByIdAndDelete(userId);
};

export default deleteUserRepository;
