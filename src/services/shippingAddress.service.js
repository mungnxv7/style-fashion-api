import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.model.js";

const addAddress = async (userId, body) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (user?.shippingAddress?.length === 0) {
    body.selected = true;
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        shippingAddress: body,
      },
    },
    { new: true }
  );

  return updatedUser?.shippingAddress;
};

const queryAddressUserId = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return user.shippingAddress || [];
};

const getAddressDetail = async (userId, addressId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const address = user.shippingAddress.id(addressId);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, "Address not found");
  }

  return address;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const updateAddressByUserId = async (userId, addressId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const addressIndex = user.shippingAddress.findIndex(
    (address) => address._id.toString() === addressId
  );
  if (addressIndex === -1) {
    throw new ApiError(httpStatus.NOT_FOUND, "Address not found");
  }
  user.shippingAddress[addressIndex] = {
    ...user.shippingAddress[addressIndex]._doc,
    ...updateBody,
  };

  await user.save();
  return user.shippingAddress[addressIndex];
};

const updateStatusAddress = async (userId, addressId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const isAddress = user.shippingAddress.find(
    (address) => address._id.toString() === addressId
  );
  if (!isAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, "Address not found");
  }
  const newAddressList = user.shippingAddress.map((item) => {
    return { ...item, selected: isAddress._id === item._id ? true : false };
  });

  user.shippingAddress = newAddressList;
  await user.save();
  return user.shippingAddress;
};

const deletAddress = async (userId, addressId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const addressIndex = user.shippingAddress.findIndex(
    (address) => address._id.toString() === addressId
  );
  if (addressIndex === -1) {
    throw new ApiError(httpStatus.NOT_FOUND, "Address not found");
  }

  user.shippingAddress.splice(addressIndex, 1);
  await user.save();
  return user;
};

const addressService = {
  addAddress,
  queryAddressUserId,
  getAddressDetail,
  updateAddressByUserId,
  updateStatusAddress,
  deletAddress,
};

export default addressService;
