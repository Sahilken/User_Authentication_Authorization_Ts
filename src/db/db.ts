import mongoose from "mongoose";

export const db = mongoose
   .connect("mongodb://localhost:27017/mydb")
   .then(() => console.log("Connected to db"))
   .catch((error) => {
      console.log(`Error connecting to MongoDB: ${error}`);
      process.exit(1);
   });
