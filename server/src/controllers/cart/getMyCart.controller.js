import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getMyCartService } from '../../service/cart/index.js';

const getMyCartController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;

  const myCart = await getMyCartService(userId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, myCart, MESSAGES.CART.FETCHED));
});

export default getMyCartController;
