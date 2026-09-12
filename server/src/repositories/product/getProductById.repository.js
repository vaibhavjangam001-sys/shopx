import { Product } from '../../models/index.js';

const getProductByIdRepository = async (productId) => {
  return Product.findOne({
    _id: productId,
    isDeleted: false,
  });
};

export default getProductByIdRepository;
