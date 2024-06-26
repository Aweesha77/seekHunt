import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";                    //import userRouter
import applicationRouter from "./routes/applicationRouter.js";      //import applicationRouter

import { dbConnection } from './database/dbConnection.js';       //import dbConnection function from dbConnection.js

import errorMiddleware from './middlewares/error.js';   
const app=express();

dotenv.config({path :'./config/config.env'});   //load env variables to process.env

// app.listen(process.env.PORT,() => {                    //start the server.process.env is a global object in Node.js that provides access to environment variables,
//   console.log(`server running on port ${process.env.PORT}`);  //app.listen() is a callback function that gets called once the server is running
// });


app.use(cors({
    origin: [process.env.FRONTEND_URL],      //the server will allow requests from to this origin
    method: ["GET", "POST", "DELETE", "PUT"], //HTTP methods that are allowed for cross-origin requests
    credentials: true,                       //allow cookies to be sent from the frontend
}));

app.use(cookieParser());                    //parse cookies from incoming requests
app.use(express.json());                    //parse json from incoming requests
app.use(express.urlencoded({ extended: true }));  //parse urlencoded data from incoming requests
                                                //This line tells Express to use the express.urlencoded() middleware. This middleware function parses incoming requests with URL-encoded payloads and is based on body-parser.extended: true option allows for rich objects and arrays to be encoded into the URL-encoded format.If extended is false, the URL-encoded data will be parsed with the querystring library.
app.use(
    fileUpload({                           //configure fileUpload middleware
      useTempFiles: true,                   //use temp files instead of memory for managing file uploads
      tempFileDir: "/tmp/",               //directory for temp files
    })
  );

  app.use("/api/v1/user", userRouter);     //use userRouter for all routes starting with /api/v1/user
  app.use("/api/v1/job", jobRouter);
  app.use("/api/v1/application", applicationRouter);

dbConnection();                           //call dbConnection function to connect to database

app.use(errorMiddleware);                  //use errorMiddleware to handle errors



export default app;