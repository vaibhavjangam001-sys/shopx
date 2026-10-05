import { ProductVariant } from '../../models/index.js';

const restoreProductVariantStockRepository = async (
  productVariantId,
  quantity,
  session
) => {
  return await ProductVariant.findOneAndUpdate(
    {
      _id: productVariantId,
      isDeleted: false,
    },
    {
      $inc: { stock: quantity },
    },
    {
      returnDocument: 'after',
      runValidators: true,
      session,
    }
  );
};

export default restoreProductVariantStockRepository;
