import { Category } from '../../models/index.js';

const findCategoryBySlugRepository = async (slug) => {
  return Category.findOne({ slug });
};

export default findCategoryBySlugRepository;
