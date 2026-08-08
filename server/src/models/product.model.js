import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Please enter product name."],
      trim: true,
      minlength: [2, "Product name at least 2 characters."],
      maxlenght: [150, "Product name less than 150 characters."],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    brand: {
      type: String,
      required: [true, "Please enter brand name."],
      trim: true,
      maxlenght: [100, "Brand name less than 100 characters."],
    },

    description: {
      type: String,
      required: [true, "Please enter product description."],
      trim: true,
      maxlenght: [5000, "Description less than 5000 characters."],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please enter product category."],
      index: true,
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

    status: {
      type: String,
      enum: ["draft", "active", "inactive"],
      default: "draft",
      index: true,
    },
  },

  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
