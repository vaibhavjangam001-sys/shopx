import { Product } from "../../models/index.js";

const findProudctBySlugRepository = async (slug) => {
  return await Product.findOne({ slug });
};

export default findProudctBySlugRepository;
