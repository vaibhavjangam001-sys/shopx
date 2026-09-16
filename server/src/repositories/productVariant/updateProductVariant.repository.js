import { ProductVariant } from '../../models/index.js';

const updateProductVariantRepository = async (
  productVariantId,
  productVariantUpdateDetails
) => {
  const allowedFields = [
    'sku',
    'price',
    'discountPrice',
    'stock',
    'attributes',
    'isActive',
  ];

  const safeUpdateDetails = {};

  for (const field of allowedFields) {
    if (productVariantUpdateDetails[field] !== undefined) {
      safeUpdateDetails[field] = productVariantUpdateDetails[field];
    }
  }

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
