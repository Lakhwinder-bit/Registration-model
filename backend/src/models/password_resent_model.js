import mongoose from "mongoose";
const passwordResetSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    default: null
  },
  
},
{
   timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
});
const passwordReset = mongoose.model("PasswordReset",passwordResetSchema);
export default passwordReset;