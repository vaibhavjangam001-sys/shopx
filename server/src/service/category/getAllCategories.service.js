import { getAllCategoriesRepository } from '../../repositories/category/index.js';

const getAllCatagoriesService = async () => {
  const categories = await getAllCategoriesRepository();
  return categories;
};

export default getAllCatagoriesService;
