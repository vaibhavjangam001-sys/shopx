import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getOrdersRepository } from '../../repositories/order/index.js';

const getOrdersService = async () => {
  return await getOrdersRepository();
};

export default getOrdersService;
