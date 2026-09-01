import { User } from '../../models/index.js';
import { ApiFeatures } from '../../utils/index.js';
import { API_FEATURERS } from '../../constants/index.js';

const getAllUsersRepository = async (queryParams) => {
  const query = User.find().select(
    'firstName lastName phone email createdAt updatedAt'
  );

  const features = new ApiFeatures(query, queryParams);

  features
    .search(API_FEATURERS.USER_SEARCH_FIELDS)
    .sort(API_FEATURERS.USER_SORT_FIELDS)
    .paginate();

  const users = await features.query.lean();
  const totalUsers = await User.countDocuments(features.filterQuery);

  return {
    users,
    totalUsers,
    currentPage: features.page,
    limit: features.limit,
  };
};

export default getAllUsersRepository;
