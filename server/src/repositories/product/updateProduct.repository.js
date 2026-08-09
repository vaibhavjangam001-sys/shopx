import { Product } from "../../models/index.js";

const updateProductRepository = async (productId, updateDetails) => {
  return await Product.findByIdAndUpdate(
    productId,
    {
      $set: updateDetails,
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
};

export default updateProductRepository;
