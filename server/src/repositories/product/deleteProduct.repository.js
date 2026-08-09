import { Product } from "../../models/index.js";

const deleteProductRepository = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};

export default deleteProductRepository;
