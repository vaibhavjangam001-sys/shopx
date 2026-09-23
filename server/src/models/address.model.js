import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    alternativePhone: {
      type: String,
      trim: true,
    },

    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },

    addressLine2: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    postalCode: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
      default: 'India',
    },

    addressType: {
      type: String,
      enum: ['HOME', 'WORK', 'OTHER'],
      default: 'HOME',
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

AddressSchema.index({
  user: 1,
  isDefault: -1,
  createdAt: -1,
});

AddressSchema.index(
  { user: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDefault: true,
    },
  }
);

const Address = mongoose.model('Address', AddressSchema);

export default Address;
