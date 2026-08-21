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
  },

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
