import { Category } from "../../models/index.js";

const getAllCategoriesRepository = async () => {
  return await Category.find();
};

export default getAllCategoriesRepository;
