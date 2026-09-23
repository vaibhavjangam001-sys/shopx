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

  PRODUCT_VARIANT: {
    CREATED: 'Product variant created successfully',
    VARIANT_ALREADY_EXISTS: 'Variant SKU already exists.',
    CREATE_FAILED: 'Failed to create product variant.',
    VARIANT_NOT_FOUND: 'Product variant not found.',
    FETCHED: 'Product variant fetched successfully.',
    FETCHED_ALL: 'Product variants fetched successfully.',
    UPDATED: 'Product variant details updated successfully.',
    UPDATE_FAILED: 'Failed to update product variant.',
    DELETE_FAILED: 'Failed to delete product variant.',
    DELETED: 'Product variant deleted successfully.',
    VARIANT_SKU_ALREADY_EXISTS: 'Product variant SKU already exists.',
    DISCOUNT_PRICE_INVALID:
      'Discount price must be less than product variant price',
    INVALID_QUANTITY: 'Quantity must be a positive integer and at least 1.',
    INSUFFICIENT_STOCK: 'Insufficient stock.',
    FAILED_TO_INCREASE_STOCK: 'Failed to increase product variant stock.',
    INCREASED: 'Product variant stock increased successfully.',
    DECREASED: 'Product variant stock decreased successfully.',
  },

  CART: {
    ITEM_ADDED: 'Cart item added successfully.',
    FETCHED: 'Cart fetched successfully.',
    NOT_FOUND: 'Cart not found.',
    ITEM_NOT_FOUND: 'Cart item not found.',
    ITEM_UPDATED: 'Cart item updated successfully.',
    CLEARED: 'Cart cleared successfully.',
    SUMMARY_FETCHED: 'Cart summary fetched successfully.',
  },

  WISH_LIST: {
    ITEM_ADDED: 'Prodcut added successfully to wishlist.',
    FETCHED: 'Wishlist fetched successfully.',
    NOT_FOUND: 'Wishlist not found.',
    ITEM_ROMOVED: 'Product removed successfully from wishlist.',
    CLEARED: 'Wishlist cleared successfully.',
  },

  AUTH: {
    REGISTER_FAILED: 'Failed to register user.',
    LOGIN_FAILED: 'Invalid email or password.',
    REGISTERED: 'User Registered successfully.',
    LOGIN: 'User logged successfully.',
    EMAIL_ALREADY_EXISTS: 'User with this email already exists.',
    PHONE_ALREADY_EXISTS: 'User with this phone number already exists.',
    UNAUTHORIZED: 'Authentication required.',
    INVALID_ACCESS_TOKEN: 'Invalid or expired access token.',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token.',
    EXPIRED_REFRESH_TOKEN: 'Refresh token expired.',
    LOGOUT_SUCCESS: 'Logged out successfully',
    REFRESH_TOKEN_SUCCESS: 'Token refreshed successfully.',
    FORBIDDEN: 'You do not have permission to perform this action.',
  },

  USER: {
    NOT_FOUND: 'User not found.',
    DELETE_FAILED: 'Failed to delete user.',
    DELETED: 'User deleted successfully.',
    FETCHED_ALL: 'Users fetched successfully.',
    FETCHED: 'User fetched successfully.',
    NOT_FOUND_BY_PHONE: 'User with this phone number not found.',
  },

  ADDRESS: {
    CREATED: 'Address created successfully.',
    FETCHED_ALL: 'addresses fetched successfully.',
    ADDRESS_NOT_FOUND: 'Address not found.',
    FETCHED: 'address fetched successfully.',
    UPDATE_FAILED: 'Failed to update address.',
    UPDATED: 'Address updated successfully.',
    DELETE_FAILED: 'Failed to delete address.',
    DELETED: 'Address deleted successfully.',
    FAILED_TO_UNSET: ' Failed to unset addresses.',
    FAILED_TO_SET: 'Failed to set address as default.',
    SET_SUCCESS: 'Address set ad default successfully',
    INVALID_FIELD__FOR_UPDATE: 'Invalid fields provided for update.',
  },

  ORDER: {
    CREATED: 'Order created successfully.',
    DELETE_FAILED: 'Failed to delete Order.',
    NOT_FOUND: 'Order not found.',
    UPDATE_FAILED: 'Failed to update Order.',
    DELETED: 'Order deleted successfully.',
    FETCHED_ALL: 'Orders fetched successfully.',
    FETCHED: 'Order fetched successfully.',
    UPDATED: 'Order updated successfully.',
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
