import { Product } from '../../models/index.js';
import { ApiFeatures } from '../../utils/index.js';
import { API_FEATURERS } from '../../constants/index.js';

const getAllProductsRepository = async (queryParams) => {
  const query = Product.find();

  const features = new ApiFeatures(query, queryParams);

  features
    .search(API_FEATURERS.PRODUCT_SEARCH_FIELDS)
    .filter()
    .sort(API_FEATURERS.PRODUCT_SORT_FIELDS)
    .fields(API_FEATURERS.PRODUCT_FIELDS)
    .paginate();

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
