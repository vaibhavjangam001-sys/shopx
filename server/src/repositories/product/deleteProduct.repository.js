import { Product } from '../../models/index.js';

const deleteProductRepository = async (productId) => {
  return Product.findByIdAndUpdate(
    {
      _id: productId,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
};

export default deleteProductRepository;
