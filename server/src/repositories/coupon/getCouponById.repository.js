import { Coupon } from '../../models/index.js';

const getCouponByIdRepository = async (couponId) => {
  return await Coupon.findOne({
    _id: couponId,
    isDeleted: false,
  });
};

export default getCouponByIdRepository;
