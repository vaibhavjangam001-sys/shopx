import { ProductVariant } from '../../models/index.js';

const updateProductVariantRepository = async (
  productVariantId,
  productVariantUpdateDetails
) => {
  return await ProductVariant.findByIdAndUpdate(
    {
      _id: productVariantId,
      isDeleted: false,
    },
    {
      $set: productVariantUpdateDetails,
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
};

export default updateProductVariantRepository;
