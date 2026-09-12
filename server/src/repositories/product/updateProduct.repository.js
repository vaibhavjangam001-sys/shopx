import { Product } from '../../models/index.js';

const updateProductRepository = async (productId, updateDetails) => {
  return Product.findByIdAndUpdate(
    {
      _id: productId,
      isDeleted: false,
    },
    {
      $set: updateDetails,
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
};

export default updateProductRepository;
