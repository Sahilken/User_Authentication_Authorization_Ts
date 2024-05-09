import express, { Request, Response } from "express";
import { MyController } from "../controller/user.controller";
import { Cred } from "../model/schema.model";

export const router = express.Router();

//register candidate
console.log("hii");
router.post("/login", MyController.loginOne);
router.post("/abcd", MyController.register);
router.post("/verify", MyController.verification);
router.post("/resend", MyController.resendOtp);
