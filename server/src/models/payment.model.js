import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      unique: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    provider: {
      type: String,
      required: true,
      enum: ['RAZORPAY'],
      default: 'RAZORPAY',
    },

    providerOrderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    providerPaymentId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: [0, 'Payment amount cannot be negative.'],
    },

    currency: {
      type: String,
      required: true,
      default: 'INR',
      uppercase: true,
    },

    status: {
      type: String,
      required: true,
      enum: ['CREATED', 'PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
      default: 'CREATED',
      index: true,
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

    refundedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
