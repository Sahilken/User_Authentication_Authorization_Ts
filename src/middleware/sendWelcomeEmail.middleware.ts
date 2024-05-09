import nodemailer from "nodemailer";

export async function sendWelcomeEmail(email: string) {
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
         subject: "Welcome to this app!",
         html: " <p> Welcome to this APPPP !!!</p>",
      });
      console.log("Welcome mail sent successfully..!");
   } catch (error) {
      console.error("Error sending welcome mail", error);
   }
}
