import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { addCartItemService } from '../../service/cart/index.js';

const addCartItemController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productVariantId, quantity } = req.body;

  const cart = await addCartItemService(userId, productVariantId, quantity);

  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, cart, MESSAGES.CART.ITEM_ADDED));
});

export default addCartItemController;
