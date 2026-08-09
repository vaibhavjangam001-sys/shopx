import { Category } from "../../models/index.js";

const getCategoryByIdRepository = async (categoryId) => {
  return await Category.findById(categoryId);
};

export default getCategoryByIdRepository;
