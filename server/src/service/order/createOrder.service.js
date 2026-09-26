import mongoose from 'mongoose';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import {
  clearCartRepository,
  getCartByUserIdRepository,
} from '../../repositories/cart/index.js';
import {
  decreaseProductVariantStockRepository,
  getProductVariantByIdRepository,
} from '../../repositories/productVariant/index.js';
import { getAddressByIdRepository } from '../../repositories/address/index.js';
import { createOrderRepository } from '../../repositories/order/index.js';
import crypto from 'crypto';

const createOrderService = async (userId, orderData) => {
  const session = await mongoose.startSession();

  try {
    let createdOrder;

    await session.withTransaction(async () => {
      const cart = await getCartByUserIdRepository(userId, session);

      if (!cart || !cart.items?.length) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.CART.EMPTY_CART);
      }

      const address = await getAddressByIdRepository(
        userId,
        orderData.addressId,
        session
      );

      if (!address) {
        throw new ApiError(
          HTTP_STATUS.NOT_FOUND,
          MESSAGES.ADDRESS.ADDRESS_NOT_FOUND
        );
      }

      const orderItems = [];

      let subTotal = 0;
      let totalQuantity = 0;

      for (const cartItem of cart.items) {
        const variant = await getProductVariantByIdRepository(
          cartItem.productVariant,
          session
        );

        if (!variant) {
          throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            `Product variant ${cartItem.productVariant} not found.`
          );
        }

        if (!Number.isInteger(cartItem.quantity) || cartItem.quantity <= 0) {
          throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            `Invalid quantity for ${variant.sku}.`
          );
        }

        if (variant.stock < cartItem.quantity) {
          throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            `Insufficient stock for ${variant.sku}.`
          );
        }

        const price = variant.price;
        const itemTotal = price * cartItem.quantity;

        subTotal += itemTotal;

        orderItems.push({
          product: variant.product._id,
          productVariant: variant._id,
          productName: variant.product.productName,
          sku: variant.sku,
          quantity: cartItem.quantity,
          price,
          totalPrice: itemTotal,
        });
      }

      const shippingCharge = subTotal >= 1000 ? 0 : 50;
      const totalAmount = subTotal + shippingCharge;

      const orderNumber = `ORD-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;

      const newOrderData = {
        orderNumber,
        user: userId,
        items: orderItems,

        shippingAddress: {
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
        },

        subtotal: subTotal,
        shippingFee: shippingCharge,
        discount: 0,
        totalAmount,
      };

      for (const cartItem of cart.items) {
        const updatedVariant = await decreaseProductVariantStockRepository(
          cartItem.productVariant,
          cartItem.quantity,
          session
        );

        if (!updatedVariant) {
          throw new ApiError(
            HTTP_STATUS.CONFLICT,
            `Insufficient stock for ${cartItem.productVariant}.`
          );
        }
      }

      createdOrder = await createOrderRepository(newOrderData, session);

      if (!createdOrder) {
        throw new ApiError(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          MESSAGES.ORDER.CREATE_FAILED
        );
      }

      const clearedCart = await clearCartRepository(cart._id, session);

      if (!clearedCart) {
        throw new ApiError(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          MESSAGES.CART.CLEAR_FAILED
        );
      }
    });

    return createdOrder;
  } finally {
    await session.endSession();
  }
};

export default createOrderService;
