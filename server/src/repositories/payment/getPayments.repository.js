import { Payment } from '../../models/index.js';

const getPaymentsRepository = async () => {
  return await Payment.find();
};

export default getPaymentsRepository;
