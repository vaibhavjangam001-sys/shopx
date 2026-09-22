import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    productVariant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductVariant',
      required: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1.'],
    },

    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative.'],
    },

    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price cannot be negative.'],
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: 'Order must contain at least one item.',
      },
    },

    shippingAddress: {
      address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
      },

      snapshot: {
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
      },
    },

    subtotal: {
      type: Number,
      required: true,
      min: [0, 'Subtotal cannot be negative.'],
    },

    shippingFee: {
      type: Number,
      required: true,
      min: [0, 'Shipping fee cannot be negative.'],
      default: 0,
    },

    discount: {
      type: Number,
      required: true,
      min: [0, 'Discount cannot be negative.'],
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total amount cannot be negative.'],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
