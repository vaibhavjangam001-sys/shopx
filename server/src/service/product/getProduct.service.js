import { getProductRepository } from "../../repository/product/index.js";

const getProductService = async (productId) => {

  const product = await getProductRepository(productId);

  if (!product) {
    return null;
  }

  return product;
};

export default getProductService;
