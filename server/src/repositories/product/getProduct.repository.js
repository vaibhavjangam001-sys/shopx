import { Product } from "../../models/index.js";

const getProductRepository = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};

export default getProductRepository;
