import mongoose from 'mongoose';

const productVariantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: [0, 'Variant price cannot be negative.'],
    },

    discountPrice: {
      type: Number,
      required: true,
      min: [0, 'Variant discount price cannot be negative.'],
    },

    stock: {
      type: Number,
      required: true,
      min: [0, 'Variant Stock cannot be negative.'],
    },

    attributes: {
      type: Map,
      of: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

export default ProductVariant;
