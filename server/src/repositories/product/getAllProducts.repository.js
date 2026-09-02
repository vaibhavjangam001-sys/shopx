import { Product } from '../../models/index.js';
import { ApiFeatures } from '../../utils/index.js';
import { API_FEATURERS } from '../../constants/index.js';

const getAllProductsRepository = async (queryParams) => {
  const query = Product.find();

  const filterQuery = {};

  if (queryParams.category) {
    filterQuery.category = queryParams.category;
  }

  if (queryParams.brand) {
    filterQuery.brand = queryParams.brand;
  }

  if (queryParams.status) {
    filterQuery.status = queryParams.status;
  }

  if (queryParams.isFeatured != undefined) {
    filterQuery.isFeatured = queryParams.isFeatured === 'true';
  }

  if (queryParams.minRating) {
    filterQuery.rating = {
      $gte: Number(queryParams.minRating),
    };
  }

  if (queryParams.minPrice || queryParams.maxPrice) {
    filterQuery.price = {};

    if (queryParams.minPrice) {
      filterQuery.price.$gte = Number(queryParams.minPrice);
    }

    if (queryParams.maxPrice) {
      filterQuery.price.$lte = Number(queryParams.maxPrice);
    }
  }

  const features = new ApiFeatures(query, queryParams);

  features
    .search(API_FEATURERS.PRODUCT_SEARCH_FIELDS)
    .filter(filterQuery)
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
