import { Order } from '../../models/index.js';
import { ApiFeatures } from '../../utils/index.js';
import { API_FEATURES } from '../../constants/index.js';

const getOrdersRepository = async (userId, queryParams = {}) => {
  const filter = {
    user: userId,
    isDeleted: false,
  };

  const status = queryParams?.status?.trim().toUpperCase();

  if (status && API_FEATURES.ALLOWED_ORDER_STATUSES.includes(status)) {
    filter.status = status;
  }

  const totalOrders = await Order.countDocuments(filter);

  const baseQuery = Order.find(filter);

  const feature = new ApiFeatures(baseQuery, queryParams)
    .sort(['createdAt'])
    .paginate();

  const orders = await feature.query;

  return {
    orders,
    totalOrders,
    currentPage: feature.page,
    limit: feature.limit,
  };
};

export default getOrdersRepository;
