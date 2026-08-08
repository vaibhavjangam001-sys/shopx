import { Product } from "../../models/index.js";

const getProductRepository = async (productId) => {
  return await Product.findById(productId);
};

export default getProductRepository;
