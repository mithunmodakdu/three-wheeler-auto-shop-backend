import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

import dotenv from "dotenv";

dotenv.config();

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      `${process.env.DB_URL}`
    );

    console.log("Successfully connected to DB!!");

    server = app.listen(5000, () => {
      console.log(`Server is listening on the port ${process.env.PORT}`);
    });
    
  } catch (error) {
    console.log(error);
  }
};

startServer();


