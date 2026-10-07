import { Coupon } from '../../models/index.js';

const updateCouponRepository = async (couponId, updateData) => {
  return await Coupon.findByIdAndUpdate(couponId, updateData, {
    returnDocument: 'after',
    runValidators: true,
  });
};

export default updateCouponRepository;
