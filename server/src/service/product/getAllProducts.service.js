import { getAllProductsRepository } from '../../repositories/product/index.js';

const getAllProductsService = async () => {
  const products = await getAllProductsRepository();
  return products;
};

export default getAllProductsService;
