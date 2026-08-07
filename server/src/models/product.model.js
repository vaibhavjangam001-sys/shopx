import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Please enter product name."],
      trim: true,
    },

    brandName: {
      type: String,
      required: [true, "Please enter brand name."],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Please enter product description."], 
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Please enter product price."],
      min: [0, "Price cannot be negative."],
    },

    ratings: {
      type: Number,
      default: 0,
    },

    productImage: [
      {
        public_id: {
          type: String,
          required: true,
        },

        url: {
          type: String,
          required: true,
        },
      },
    ],

    category: {
      type: String,
      required: [true, "Please enter product category."],
      trim: true,
    },

    stock: {
      type: Number,
      required: [true, "Please enter product stock."],
      min: [1, "stock cannot less than 1."],
      max: [50000, "stock cannot greater than 50,000."],
      default: 1,
    },

    numberOfReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        name: {
          type: String,
          required: true,
        },

        rating: {
          type: Number,
          required: true,
        },

        comment: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },

  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
