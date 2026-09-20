import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getMyAddressesService } from '../../service/address/index.js';

const getMyAddressesController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;

  const addresses = await getMyAddressesService(userId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, addresses, MESSAGES.ADDRESS.FETCHED_ALL)
    );
});

export default getMyAddressesController;
