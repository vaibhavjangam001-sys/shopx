import { ProductVariant } from '../../models/index.js';

const decreaseProductVariantStockRepository = async (
  productVariantId,
  quantity,
  session
) => {
  return await ProductVariant.findOneAndUpdate(
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
      session,
    }
  );
};

export default decreaseProductVariantStockRepository;
