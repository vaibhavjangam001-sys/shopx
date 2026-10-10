import { Order } from '../../models/index.js';

const getOrderByIdRepository = async (userId, orderId, session) => {
  let query = Order.findOne({
    _id: orderId,
    user: userId,
    isDeleted: false,
  });

  if (session) {
    query = query.session(session);
  }

  return query;
};

export default getOrderByIdRepository;
