import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  image: String,
  isRegistered: {
    type: Boolean,
    default: false,
  },
  choices: {
    type: Array,
    default: [],
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
