import { ProductVariant } from '../../models/index.js';

const decreaseProductVariantStockRepository = async (
  productVariantId,
  quantity
) => {
  return await ProductVariant.findByIdAndUpdate(
    {
      _id: productVariantId,
      isDeleted: false,
      stock: { $gte: quantity },
    },
    {
      $inc: { stock: -quantity },
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
};

export default decreaseProductVariantStockRepository;
