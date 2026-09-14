import { ProductVariant } from '../../models/index.js';

const updateProductVariantRepository = async (
  productVariantId,
  productVariantUpdateDetails
) => {
  return await ProductVariant.findByIdAndUpdate(
    productVariantId,
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
