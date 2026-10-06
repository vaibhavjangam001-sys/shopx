import { Coupon } from '../../models/index.js';

const createCouponRepository = async (couponData) => {
  const [coupon] = await Coupon.create([couponData]);
  return coupon;
};

export default createCouponRepository;
