const mongoose = require("mongoose");

const { Schema } = mongoose;

const accessTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User",required:true },
token: { type: String, required: true },
blacklisted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now(), expires: "1hr" },
});

const validToken = mongoose.model(
  "validToken",
  accessTokenSchema
);

module.exports = validToken;
