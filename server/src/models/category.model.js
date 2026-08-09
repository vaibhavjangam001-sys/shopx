import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category : {
      type: String,
      required: [true, "Please enter category name."],
      trim: true,
      minlength: [2, "Category name must be at least 2 characters."],
      maxlength: [100, "Category name must be less than 100 characters."],
      unique: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Category decription must be less than 500 characters."],
    },

    image: {
      url: {
        type: String,
        trim: true,
      },
      publicId: {
        type: String,
        trim: true,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
