import { getWishlistByUserIdService } from '../../service/wishlist/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const getWishlistByUserIdController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;

  const wishlist = await getWishlistByUserIdService(userId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, wishlist, MESSAGES.WISH_LIST.FETCHED)
    );
});

export default getWishlistByUserIdController;
