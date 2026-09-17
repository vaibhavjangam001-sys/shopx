import { getCartSummaryService } from '../../service/cart/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';

const getCartSummaryController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;

  const summary = await getCartSummaryService(userId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, summary, MESSAGES.CART.SUMMARY_FETCHED)
    );
});

export default getCartSummaryController;
