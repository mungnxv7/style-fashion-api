import City from "../models/City/City.model.js";
import District from "../models/City/District.model.js";
import Ward from "../models/City/Ward.model.js";

const queryCitiess = async () => {
  const cities = await City.find();
  return cities;
};

const queryDistricts = async (cityId) => {
  const districts = await District.find({ cityId });
  return districts;
};

const queryWards = async (districtId) => {
  const wards = await Ward.find({ districtId });
  return wards;
};

const cityService = {
  queryCitiess,
  queryDistricts,
  queryWards,
};

export default cityService;
