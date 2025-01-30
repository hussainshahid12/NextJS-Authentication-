const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minxLength: [8, "password  maxlength 8"],
  },
  role: { type: [String], enum: ["user", "admin"], default: ["user"] },
  check: { type: "boolean", default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
