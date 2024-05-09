import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { router } from "./routes/user.route";
const app = express();
const port = process.env.PORT;
import { db } from "./db/db";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

db.then(() => {
   app.listen(port, () => {
      console.log(`Started at port ${port}`);
   });
});
