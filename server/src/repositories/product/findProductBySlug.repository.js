import { Product } from '../../models/index.js';

const findProudctBySlugRepository = async (slug) => {
  return Product.findOne({ slug });
};

export default findProudctBySlugRepository;
