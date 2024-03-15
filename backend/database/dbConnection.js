import mongoose from "mongoose";

export const dbConnection = () => {    
    mongoose
      .connect(process.env.MONGO_URI, {     //connect to the database
        dbName: "MERN_SEEKHUNTER",
      })
      .then(() => {                         //if connection is successful
        console.log("Connected to database.");
      })
      .catch((err) => {
        console.log(`Some Error occured. ${err}`);
      });
 };