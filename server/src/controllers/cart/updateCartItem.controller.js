import { ApiError, ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { updateCartItemService } from '../../service/cart/index.js';

const updateCartItemController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productVariantId, quantity } = req.body;

  const updatedCart = await updateCartItemService(
    userId,
    productVariantId,
    quantity
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, updatedCart, MESSAGES.CART.ITEM_UPDATED)
    );
});

export default updateCartItemController;
