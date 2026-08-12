import { Product } from '../../models/index.js';
import { ApiFeatures } from '../../utils/index.js';

const getAllProductsRepository = async (queryParams) => {
  const query = Product.find();

  const features = new ApiFeatures(query, queryParams);

  features.search().filters().sort().fields().paginate();

  const products = await features.query.lean();

  const totalProducts = await Product.countDocuments(features.filterQuery);

  return {
    products,
    totalProducts,
    currentPage: features.page,
    limit: features.limit,
  };
};

export default getAllProductsRepository;
