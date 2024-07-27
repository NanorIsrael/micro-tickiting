import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, default: "" },
    friends: { type: Array, default: [] },
    location: String,
    occupation: String,
    viewedProfileNumber: Number,
    impressions: Number,
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);
export default User;
