import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: String },
  },
  { collection: "Attribute", timestamps: true, versionKey: false }
);

const Attributes = mongoose.model("Attribute", attributeSchema);

export default Attributes;
