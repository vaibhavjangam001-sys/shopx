import { Payment } from '../../models/index.js';
import { ApiFeatures } from '../../utils/index.js';

const getPaymentsRepository = async (queryParams = {}) => {
  const baseQuery = {};

  if (
    ['CREATED', 'PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'].includes(
      queryParams.status
    )
  ) {
    baseQuery.status = queryParams.status;
  }

  if (queryParams.provider === 'RAZORPAY') {
    baseQuery.provider = queryParams.provider;
  }

  const query = Payment.find(baseQuery);

  const features = new ApiFeatures(query, queryParams)
    .search(['providerOrderId', 'providerPaymentId'])
    .sort(['createdAt', 'updatedAt', 'amount', 'status', 'paidAt'])
    .fields([
      'order',
      'user',
      'provider',
      'providerOrderId',
      'providerPaymentId',
      'amount',
      'currency',
      'status',
      'failureReason',
      'paidAt',
      'refundedAt',
      'createdAt',
      'updatedAt',
    ])
    .paginate();

  const [payments, totalPayments] = await Promise.all([
    features.query.lean().exec(),
    Payment.countDocuments(features.filterQuery).exec(),
  ]);

  return {
    payments,
    totalPayments,
    currentPage: features.page,
    limit: features.limit,
  };
};

export default getPaymentsRepository;
