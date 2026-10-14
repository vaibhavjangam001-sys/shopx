import mongoose from 'mongoose';

const paymentAttemptSchema = new mongoose.Schema(
  {
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
      index: true,
    },

    providerPaymentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ['SUCCESS', 'PENDING', 'FAILED'],
      default: 'PENDING',
      required: true,
    },

    failureReason: {
      type: String,
      default: null,
      trim: true,
    },

    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PaymentAttempt = mongoose.model('PaymentAttempt', paymentAttemptSchema);

export default PaymentAttempt;
