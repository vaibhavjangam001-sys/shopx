import { Product } from '../../models/index.js';

const findProductBySlugRepository = async (slug) => {
  return Product.findOne({ slug });
};

export default findProductBySlugRepository;
