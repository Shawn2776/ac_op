import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      // trim: true,
      // maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      // trim: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
// Compare this snippet from app/api/register/index.js:
