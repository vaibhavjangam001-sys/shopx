import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { deleteAddressService } from '../../service/address/index.js';

const deleteAddressController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;

  const deletedAddress = await deleteAddressService(userId, addressId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, deletedAddress, MESSAGES.ADDRESS.DELETED)
    );
});

export default deleteAddressController;
