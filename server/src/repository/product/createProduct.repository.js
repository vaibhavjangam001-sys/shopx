import { Product } from "../../models/index.js";

const createProductRepository = async (productData) => {
  const product = await Product.create({
    productName: productData.productName,
    brandName: productData.brandName,
    description: productData.description,
    price: productData.price,
    productImage: productData.productImage,
    category: productData.category,
    stock: productData.stock,
  });

  return product;
};

export default createProductRepository;
