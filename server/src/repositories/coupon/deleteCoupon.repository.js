import { Coupon } from '../../models/index.js';

const deleteCouponRepository = async (couponId) => {
  return await Coupon.findByIdAndUpdate(
    couponId,
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
        isActive: false,
      },
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
};

export default deleteCouponRepository;
