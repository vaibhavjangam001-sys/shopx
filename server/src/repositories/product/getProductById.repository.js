import { Product } from "../../models/index.js";

const getProductByIdRepository = async (productId) => {
  return await Product.findById(productId);
};

export default getProductByIdRepository;
