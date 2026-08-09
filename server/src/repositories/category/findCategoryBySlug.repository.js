import { Category } from "../../models/index.js";

const findCategoryBySlugRepository = async (slug) => {
  return await Category.findOne({ slug });
};

export default findCategoryBySlugRepository;
