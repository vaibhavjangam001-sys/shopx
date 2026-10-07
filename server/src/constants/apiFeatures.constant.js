const API_FEATURES = Object.freeze({
  PRODUCT_SORT_FIELDS: Object.freeze([
    'price',
    'rating',
    'productName',
    'createdAt',
  ]),

  PRODUCT_SEARCH_FIELDS: Object.freeze(['productName']),

  USER_SORT_FIELDS: Object.freeze(['firstName', 'lastName', 'createdAt']),

  USER_SEARCH_FIELDS: Object.freeze([
    'firstName',
    'lastName',
    'email',
    'phone',
  ]),

  PRODUCT_FIELDS: Object.freeze([
    'productName',
    'price',
    'discountPrice',
    'rating',
    'numOfReviews',
    'images',
    'description',
    'brand',
    'isFeatured',
  ]),

  CATEGORY_SEARCH_FIELDS: ['category', 'description'],

  CATEGORY_SORT_FIELDS: ['category', 'createdAt', 'updatedAt'],

  CATEGORY_FIELDS: [
    'category',
    'slug',
    'description',
    'image',
    'isActive',
    'createdAt',
    'updatedAt',
  ],

  USER_FIELDS: Object.freeze([
    'firstName',
    'lastName',
    'phone',
    'email',
    'createdAt',
    'updatedAt',
  ]),

  ALLOWED_ORDER_STATUSES: ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
  ORDER_SORT_FIELDS: ['createdAt', 'updatedAt', 'totalAmount', 'status'],
  COUPON_TYPES: ['PERCENTAGE', 'FIXED'],
  COUPON_ALLOWED_FIELDS: [
    'discountType',
    'discountValue',
    'minOrderAmount',
    'maxDiscount',
    'startDate',
    'expiryDate',
    'usageLimit',
    'perUserLimit',
    'isActive',
  ],
});

export default API_FEATURES;
