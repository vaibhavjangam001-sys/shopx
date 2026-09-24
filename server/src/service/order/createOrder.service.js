import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getCartByUserIdRepository } from '../../repositories/cart/index.js';
import {
  decreaseProductVariantStockRepository,
  getProductVariantByIdRepository,
} from '../../repositories/productVariant/index.js';
import { getAddressByIdRepository } from '../../repositories/address/index.js';
import { createOrderRepository } from '../../repositories/order/index.js';
import crypto from 'crypto';

const createOrderService = async (userId, orderData) => {
  const { addressId } = orderData;

  if (!addressId) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.ADDRESS.ADDRESS_REQUIRED
    );
  }

  const cart = await getCartByUserIdRepository(userId);

  if (!cart || cart.items.length === 0) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.CART.EMPTY_CART);
  }

  const address = await getAddressByIdRepository(userId, addressId);

  if (!address) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.ADDRESS.ADDRESS_NOT_FOUND
    );
  }

  const orderItems = [];
  let subtotal = 0;

  for (const cartItem of cart.items) {
    const variant = await getProductVariantByIdRepository(
      cartItem.productVariant
    );

    if (!variant || variant.isDeleted || !variant.isActive) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.ORDER.PRODUCT_NOT_AVILABLE
      );
    }

    if (variant.stock < cartItem.quantity) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        `Insufficient stock for ${variant.sku}.`
      );
    }

    const updatedVariant = await decreaseProductVariantStockRepository(
      variant._id,
      cartItem.quantity
    );

    if (!updatedVariant) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        `Insufficient stock for ${variant.sku}.`
      );
    }

    const finalPrice =
      variant.discountPrice < variant.price
        ? variant.discountPrice
        : variant.price;

    const totalPrice = finalPrice * cartItem.quantity;

    orderItems.push({
      product: variant.product,
      productVariant: variant._id,
      productName: variant.product.productName,
      sku: variant.sku,
      quantity: cartItem.quantity,
      price: finalPrice,
      totalPrice,
    });

    subtotal += totalPrice;
  }

  const shippingFee = subtotal >= 1000 ? 0 : 50;
  const discount = 0;

  const totalAmount = subtotal + shippingFee - discount;

  const shippingAddress = {
    address: address._id,

    snapshot: {
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
    },
  };

  const orderNumber = `ORD-${Date.now()}-${crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase()}`;

  const finalOrderData = {
    orderNumber,
    user: userId,
    items: orderItems,
    shippingAddress,
    subtotal,
    shippingFee,
    discount,
    totalAmount,
  };

  const order = await createOrderRepository(finalOrderData);

  return order;
};

export default createOrderService;
