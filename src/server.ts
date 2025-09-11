/* eslint-disable no-console */
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

process.on("unhandledRejection", (err)=>{
  console.log("Unhandled Rejection detected... Server is closing down...", err);

  if(server){
    server.close(()=>{
      process.exit(1);
    })
  }

  process.exit(1);

})

process.on("uncaughtException", (err) =>{
  console.log("Uncaught Exception Error detected... Server is shutting down...", err)

  if(server){
    server.close(() =>{
      process.exit(1);
    })
  }

  process.exit(1);
})

process.on("SIGTERM", ()=>{
  console.log("SIGTERM signal is received. Server is shutting down... ")

  if(server){
    server.close(()=>{
      process.exit(1);
    })
  }

  process.exit(1);
})

process.on("SIGINT", ()=>{
  console.log("SIGINT signal is received. Server is shutting down... ")

  if(server){
    server.close(()=>{
      process.exit(1);
    })
  }

  process.exit(1);
})

