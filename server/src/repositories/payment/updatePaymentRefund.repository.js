import { Payment } from '../../models/index.js';

const updatePaymentRefundRepository = async (
  paymentId,
  refundAmount,
  session = null
) => {
  return await Payment.findOneAndUpdate(
    {
      _id: paymentId,
      status: 'SUCCESS',
      $expr: {
        $lte: [{ $add: ['$refundedAmount', refundAmount] }, '$amount'],
      },
    },
    [
      {
        $set: {
          refundedAmount: {
            $add: ['$refundedAmount', refundAmount],
          },
        },
      },
      {
        $set: {
          status: {
            $cond: [
              { $eq: ['$refundedAmount', '$amount'] },
              'REFUNDED',
              'SUCCESS',
            ],
          },

          refundedAt: {
            $cond: [
              {
                $eq: ['$refundedAmount', '$amount'],
              },
              '$$NOW',
              '$refundedAt',
            ],
          },
        },
      },
    ],
    {
      returnDocument: 'after',
      ...(session && { session }),
    }
  );
};

export default updatePaymentRefundRepository;
