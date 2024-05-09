import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface userCred {
   email: string;
   password: string;
   // otp?: string;
}

const userSchema = new Schema<userCred>({
   email: {
      type: String,
      required: true,
   },

   password: {
      type: String,
      required: true,
   },
});

userSchema.pre("save", async function (next) {
   const user = this;
   if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
   }
   next();
});

export const Cred = model<userCred>("Cred", userSchema);
