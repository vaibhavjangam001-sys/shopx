import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { updateAddressService } from '../../service/address/index.js';

const updateAddressController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;
  const updateData = req.body;

  const updatedAddress = await updateAddressService(
    userId,
    addressId,
    updateData
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, updatedAddress, MESSAGES.ADDRESS.UPDATED)
    );
});

export default updateAddressController;
