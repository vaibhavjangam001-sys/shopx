import { ProductVariant } from '../../models/index.js';

const deleteProductVariantRepository = async (productVariantId) => {
  return await ProductVariant.findByIdAndUpdate(
    {
      _id: productVariantId,
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

export default deleteProductVariantRepository;
