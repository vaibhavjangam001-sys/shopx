import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    productVariant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductVariant',
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1.'],
    },

    price: {
      type: Number,
      required: true,
      min: [1, 'Price cannot be negative.'],
    },
  },
  {
    _id: false,
  }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
      unique: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
