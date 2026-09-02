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

  USER_FIELDS: Object.freeze([
    'firstName',
    'lastName',
    'phone',
    'email',
    'createdAt',
    'updatedAt',
  ]),
});

export default API_FEATURES;
