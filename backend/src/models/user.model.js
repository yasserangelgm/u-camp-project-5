const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

userSchema.statics.encryptPassword = async function (password) {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

userSchema.statics.comparePasswords = async function (
  password,
  receivePassword
) {
  return bcryptjs.compare(password, receivePassword);
};

module.exports = mongoose.model("User", userSchema);
