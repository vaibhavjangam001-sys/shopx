import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { deleteUserService } from '../../service/user/index.js';

const deleteUserController = AsyncHandler(async (req, res) => {
  const deletedUser = await deleteUserService(req.params.userId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, deletedUser, MESSAGES.USER.DELETED));
});

export default deleteUserController;
