import mongoose from "mongoose";
import { roles } from "../config/roles.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import toJSON from "./plugins/toJSON.plugin.js";
import { paginate } from "./plugins/paninate.plugin.js";

const addressSchema = new mongoose.Schema(
  {
    recipientName: {
      type: String,
      required: true,
      trim: true,
    },
    recipientPhoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    streetAddress: {
      type: String,
      required: true,
      trim: true,
    },
    wardCommune: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    cityProvince: {
      type: String,
      required: true,
      trim: true,
    },
  }
  // {
  //   _id: false,
  // }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    shippingAddress: {
      type: [addressSchema],
      default: [],
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneNumberVerified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
      private: true,
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

userSchema.plugin(paginate);
userSchema.plugin(toJSON);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isPhoneNumberTaken = async function (
  phoneNumber,
  excludeUserId
) {
  const user = await this.findOne({ phoneNumber, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
