import { getPaymentsRepository } from '../../repositories/payment/index.js';

const getPaymentsService = async () => {
  const payments = await getPaymentsRepository();

  return payments;
};

export default getPaymentsService;
