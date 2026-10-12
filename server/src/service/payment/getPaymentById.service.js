import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getPaymentByIdRepository } from '../../repositories/payment/index.js';

const getPaymentByIdService = async (paymentId) => {
  const payment = await getPaymentByIdRepository(paymentId);

  if (!payment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PAYMENT.NOT_FOUND);
  }

  return payment;
};

export default getPaymentByIdService;
