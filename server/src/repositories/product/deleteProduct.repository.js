import { Product } from "../../models/index.js";

const deleteProductRepository = async (productId) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};

export default deleteProductRepository;
