import { Product } from "../../models/index.js";

const createProductRepository = async (productData) => {
  return await Product.create(productData);
};

export default createProductRepository;
