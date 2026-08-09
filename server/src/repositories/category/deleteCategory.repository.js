import { Category } from "../../models/index.js";

const deleteCategoryRepository = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId);
};

export default deleteCategoryRepository;
