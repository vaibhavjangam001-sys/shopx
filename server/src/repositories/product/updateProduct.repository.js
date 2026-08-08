import { Product } from "../../models/index.js";

const updateProductRepository = async (productId, updateDetails) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $set: updateDetails,
    },
    {
      returnDocument : "after",
      runValidators: true,
    },
  );

  return updatedProduct;
};

export default updateProductRepository;
