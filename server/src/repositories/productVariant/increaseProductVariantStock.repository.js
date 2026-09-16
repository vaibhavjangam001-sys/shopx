import { ProductVariant } from '../../models/index.js';

const increaseProductVariantStockRepository = async (
  productVariantId,
  quantity
) => {
  return await ProductVariant.findByIdAndUpdate(
    {
      _id: productVariantId,
      isDeleted: false,
    },
    {
      $inc: {
        stock: quantity,
      },
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
};

export default increaseProductVariantStockRepository;
