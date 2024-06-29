import Attributes from "../models/attribute.model.js"


const getAttributeByID = async (attributeID) =>{
    return await Attributes.findById(attributeID);
}
const createAttributeMany = async (attributes) =>{
    return await Attributes.insertMany(attributes);
}
const deleteAttributeMany = async (attributes) =>{
    return await Attributes.deleteMany({ _id: { $in: attributes } });
}

const attributeService = {getAttributeByID,createAttributeMany,deleteAttributeMany}

export default attributeService