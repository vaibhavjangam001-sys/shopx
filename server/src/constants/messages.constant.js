const MESSAGES = Object.freeze({
  CATEGORY: {
    CREATED: 'Category created successfully.',
    UPDATED: 'Category updated successfully.',
    DELETED: 'Category deleted successfully.',
    FETCHED: 'Category fetched successfully.',
    FETCHED_ALL: 'Categories fetched successfully.',
    NOT_FOUND: 'Category not found.',
    SLUG_ALREADY_EXISTS: 'Category with this slug already exists.',
    CREATE_FAILED: 'Failed to create category.',
    UPDATE_FAILED: 'Failed to update Category.',
    DELETE_FAILED: 'Failed to delete category.',
    HAS_PRODUCTS: 'Cannot delete category because it has associated products.',
  },

  PRODUCT: {
    CREATED: 'Product added successfully.',
    UPDATED: 'Product details updated successfully.',
    DELETED: 'Product deleted successfully.',
    FETCHED: 'Product fetched successfully.',
    FETCHED_ALL: 'Products fetched successfully.',
    NOT_FOUND: 'Product not found.',
    SLUG_ALREADY_EXISTS: 'Product with this slug already exists.',
    CREATE_FAILED: 'Failed to create product.',
    UPDATE_FAILED: 'Failed to update product.',
    DELETE_FAILED: 'Failed to delete product.',
    IMAGE_REQUIRED: 'At least one product image is required',
    DISCOUNT_PRICE_INVALID: 'Discount price must be less than product price',
  },

  AUTH: {
    REGISTER_FAILED: 'Failed to register user',
    LOGIN_FAILED: 'Invalid email or password',
    REGISTERED: 'User Registered successfully',
    LOGIN: 'User logged successfully',
    EMAIL_ALREADY_EXISTS: 'User with this email already exists.',
    PHONE_ALREADY_EXISTS: 'User with this phone number already exists.',
  },

  USER: {},

  SERVER: {
    INTERNAL_ERROR: 'Internal server error.',
  },

  VALIDATION: {
    FAILED: 'Validation failed',
  },

  DATABASE: {
    DUPLICATE_VALUE: 'Duplicate value already exists.',
  },
});

export default MESSAGES;
