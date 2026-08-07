import { createProductRepository } from "../../repository/product/index.js";

const createProductService = async (productData) => {
  const product = await createProductRepository(productData);

  return product;
};

export default createProductService;
