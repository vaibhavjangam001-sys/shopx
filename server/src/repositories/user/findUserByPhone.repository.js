import { User } from '../../models/index.js';

const findUserByPhoneRepository = (phoneNumber) => {
  return User.findOne({ phone: phoneNumber });
};

export default findUserByPhoneRepository;
