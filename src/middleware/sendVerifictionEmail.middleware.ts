import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, otp: string) {
   try {
      const transporter = nodemailer.createTransport({
         service: "gmail",
         host: "smtp.gmail.com",
         port: 587,
         secure: false,
         auth: {
            user: "sahil456q@gmail.com",
            pass: "legb xuxv gpuc xstk",
         },
      });

      await transporter.sendMail({
         from: "sahil456q@gmail.com",
         to: email,
         subject: "OTP for verification!",

         html: `<h1>Please confirm your OTP </h1> <p> Here is your OTP code: ${otp} !!</p>`,
      });
      console.log("Verification Email sent successfully..!");
   } catch (error) {
      console.error("Error occured while sending email", error);
   }
}
