import nodemailer from "nodemailer";
import { sendWelcomeEmail } from "../middleware/sendWelcomeEmail.middleware";
import { Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Cred } from "../model/schema.model";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { ranOTP } from "../middleware/generateOtp.middleware";
import { sendVerificationEmail } from "../middleware/sendVerifictionEmail.middleware";
import { OTP } from "../model/otp.model";
dotenv.config();
const MY_SECRET = process.env.MYSECRET;

class myController {
   register = async (req: Request, res: Response) => {
      const user = {
         email: req.body.email,
         password: req.body.password,
      };

      const isPresent = await Cred.findOne({ email: user.email });

      if (isPresent) {
         res.status(400).send("User already present");
      } else {
         const newUser = await Cred.create(user);

         sendWelcomeEmail(user.email);

         const otp = ranOTP();

         //generate otp save in db and send it to user for verification purpose
         sendVerificationEmail(user.email, otp);
         //
         const newOTP = await OTP.create({
            type: "email",
            email: newUser.email,
            user: newUser._id,
            otp: otp,
         });

         return res.status(201).send(newUser);
      }
   };

   loginOne = async (req: Request, res: Response) => {
      try {
         const user = req.body;
         //find email in database
         const { email, password } = user;
         const isUserExist = await Cred.findOne({ email: email });

         if (!isUserExist) {
            return res.status(404).json({ message: "User not found" });
         }
         //compare password

         bcrypt.compare(password, "MY_SECRET", () => {
            const isPassMatched = isUserExist?.password === password;
            if (!isPassMatched) {
               console.log("Wrong password");
            }
         });

         //legitimate user so Create token

         const token = jwt.sign(
            { _id: isUserExist?._id, email: isUserExist?.email },
            "MY_SECRET",
            {
               expiresIn: "1d",
            }
         );
         console.log(token);
         return res.status(200).send({ message: "login success" });
      } catch (error: any) {
         res.status(400).send({ message: error.message.toString() });
      }
   };
   verification = async (req: Request, res: Response) => {
      try {
         const { otp, user, type } = req.body;
         const findUser = await Cred.findOne({ _id: user });
         if (findUser) {
            const savedOtp = await OTP.findOne({ user: user });

            if (savedOtp && otp === savedOtp.otp) {
               res.status(200).send({ message: "Verified successfull" });
            } else {
               res.status(400).send({
                  message: "Incorrect OTP. Please try again.",
               });
            }
         } else {
            res.status(401).send({ message: "User not found" });
         }
      } catch (error: any) {
         res.status(400).send({ message: error.message.toString() });
      }
   };
   resendOtp = async (req: Request, res: Response) => {
      try {
         //delete otp from db
         const ugOTP = {
            user: req.body.user,
            type: req.body.type,
         };
         const findUser = await OTP.findOneAndUpdate(
            { _id: ugOTP.user },
            { otp: ranOTP() },
            { upsert: true }
            // { new: true }
         );
         if (!findUser) {
            res.status(401).send({ message: "User not found" });
         }

         //create new otp and save in db
      } catch (error: any) {
         res.status(400).send({ message: error.message.toString() });
      }
   };
}

export const MyController = new myController();
