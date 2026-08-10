import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Please enter product name.'],
      trim: true,
      minlength: [2, 'Product name must be at least 2 characters.'],
      maxlength: [150, 'Product name must be less than 150 characters.'],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    sku: {
      type: String,
      required: [true, 'Please enter product SKU.'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    brand: {
      type: String,
      required: [true, 'Please enter brand name.'],
      trim: true,
      maxlength: [100, 'Brand name must be less than 100 characters.'],
    },

    description: {
      type: String,
      required: [true, 'Please enter product description.'],
      trim: true,
      maxlength: [
        5000,
        'Product description must be less than 5000 characters.',
      ],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please enter product category.'],
      index: true,
    },

    price: {
      type: Number,
      required: [true, 'Please enter product price.'],
      min: [0, 'Price cannot be negative.'],
    },

    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative.'],
      default: null,
    },

    stock: {
      type: Number,
      required: [true, 'Please enter product stock.'],
      min: [0, 'Stock cannot be negative.'],
      default: 0,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
          trim: true,
        },

        publicId: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    rating: {
      type: Number,
      min: [0, 'Rating cannot be less than 0.'],
      max: [5, 'Rating connot be greater than 5.'],
      default: 0,
    },

    numOfReviews: {
      type: Number,
      min: [0, 'Review count cannot be negative.'],
      default: 0,
    },

    status: {
      type: String,
      enum: ['draft', 'active', 'inactive'],
      default: 'draft',
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
