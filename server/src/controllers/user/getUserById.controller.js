import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getUserByIdService } from '../../service/user/index.js';

const getUserByIdController = AsyncHandler(async (req, res) => {
  const user = await getUserByIdService(req.params.userId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, user, MESSAGES.USER.FETCHED));
});

export default getUserByIdController;
