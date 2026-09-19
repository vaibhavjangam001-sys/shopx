import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { clearCartService } from '../../service/cart/index.js';

const clearCartController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;

  const clearedCart = await clearCartService(userId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, clearedCart, MESSAGES.CART.CLEARED));
});

export default clearCartController;
