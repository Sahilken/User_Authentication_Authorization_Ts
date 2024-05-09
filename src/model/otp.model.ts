import mongoose, { Schema, model } from "mongoose";
import { Cred } from "./schema.model";
const otpSchema = new Schema({
   type: {
      type: String,
      required: true,
      enum: ["email", "mobile"],
   },
   user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: Cred.name,
   },
   otp: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
      // expires: 5 * 60,
   },
});
export const OTP = model("OTP", otpSchema);
