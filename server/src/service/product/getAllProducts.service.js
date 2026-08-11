import { getAllProductsRepository } from '../../repositories/product/index.js';

const getAllProductsService = async (queryParams) => {
  return await getAllProductsRepository(queryParams);
};

export default getAllProductsService;
