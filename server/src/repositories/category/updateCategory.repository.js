import { Category } from "../../models/index.js";

const updateCategoryRepository = async (categoryId, updateDetails) => {
  return await Category.findByIdAndUpdate(
    categoryId,
    {
      $set: updateDetails,
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
};

export default updateCategoryRepository;
