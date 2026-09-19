import { clearWishlistService } from '../../service/wishlist/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const clearWishlistController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;

  const wishlist = await clearWishlistService(userId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, wishlist, MESSAGES.WISH_LIST.CLEARED)
    );
});

export default clearWishlistController;
