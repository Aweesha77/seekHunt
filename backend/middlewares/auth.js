import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {     //isAuthenticated is a function that takes three parameters: req, res, and next. This function will be used to handle errors in the application.
  const { token } = req.cookies;     //req.cookies is an object that contains all the cookies sent by the client
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  //jwt.verify is a function that takes two parameters: token and secret key. This function will be used to verify the token

  req.user = await User.findById(decoded.id);   //req.user is an object that contains the user information

  next();  //next is a function that is used to pass control to the next middleware function
});
