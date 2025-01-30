const mongoose = require("mongoose");

const { Schema } = mongoose;

const emailVerifySchema = new Schema({
  userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), expires: "10m" }, // TTL index for automatic deletion
});

const emailVerificationModel = mongoose.model(
  "emailVerificationModel",
  emailVerifySchema
);

module.exports = emailVerificationModel;
