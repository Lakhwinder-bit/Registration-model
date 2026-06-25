import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      maxlength: 15,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
      lowercase: true,
      trim: true,
    },

    designation: {
      type: String,
      maxlength: 100,
      default: "",
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);
export default User;

export const userExists = async (username, email) => {
  const user = await User.findOne({
    $or: [
      { username },
      { email }
    ]
  });

  return user;
};

export const createUser = async (userData) => {
    return await User.create(userData)
}