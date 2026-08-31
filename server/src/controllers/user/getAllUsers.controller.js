import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getAllUsersService } from '../../service/user/index.js';

const getAllUsersController = AsyncHandler(async (req, res) => {
  const users = await getAllUsersService();

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, users, MESSAGES.USER.FETCHED_ALL));
});

export default getAllUsersController;
