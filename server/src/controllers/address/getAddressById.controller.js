import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { getAddressByIdService } from '../../service/address/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const getAddressByIdController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { addressId } = req.params;

  const address = await getAddressByIdService(userId, addressId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, address, MESSAGES.ADDRESS.FETCHED));
});

export default getAddressByIdController;
