import { Category } from '../../models/index.js';
import { ApiFeatures } from '../../utils/index.js';
import { API_FEATURERS } from '../../constants/index.js';

const getAllCategoriesRepository = async (queryParams) => {
  const features = new ApiFeatures(Category.find(), queryParams);

  features
    .search(API_FEATURERS.CATEGORY_SEARCH_FIELDS)
    .sort(API_FEATURERS.CATEGORY_SORT_FIELDS)
    .fields(API_FEATURERS.CATEGORY_FIELDS)
    .paginate();

  const categories = await features.query.lean();

  const totalCategories = await Category.countDocuments(features.filterQuery);

  return {
    categories,
    totalCategories,
    currentPage: features.page,
    limit: features.limit,
  };
};

export default getAllCategoriesRepository;
