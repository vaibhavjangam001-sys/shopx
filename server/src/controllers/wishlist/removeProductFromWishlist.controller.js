import { removeProductFromWishlistService } from '../../service/wishlist/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const removeProdcutFromWishlistController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const wishlist = await removeProductFromWishlistService(userId, productId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, wishlist, MESSAGES.WISH_LIST.ITEM_ROMOVED)
    );
});

export default removeProdcutFromWishlistController;
