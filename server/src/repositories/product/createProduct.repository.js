import { Product } from "../../models/index.js";

const createProductRepository = async (productData) => {
  const product = await Product.create(productData);

  return product;
};

export default createProductRepository;
