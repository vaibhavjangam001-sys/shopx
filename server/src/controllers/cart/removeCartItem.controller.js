import { removeCartItemService } from '../../service/cart/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const removeCartItemController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productVariantId } = req.body;

  const updatedCart = await removeCartItemService(userId, productVariantId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, updatedCart, MESSAGES.CART.ITEM_REMOVED)
    );
});

export default removeCartItemController;
