import { Category } from "../../models/index.js";

const createCategoryRepository = async (categoryData) => {
  return await Category.create(categoryData);
};

export default createCategoryRepository;
