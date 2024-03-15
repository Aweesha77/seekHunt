import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app=express();

dotenv.config({path :'./config/config.env'});   //load env variables to process.env

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

export default app;