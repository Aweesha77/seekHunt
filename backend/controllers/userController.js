import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {     //register is a function that takes three parameters: req, res, and next. This function will be used to handle errors in the application.
  const { name, email, phone, password, role } = req.body;   //req.body is an object that contains the parsed request body
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  const user = await User.create({        //User.create() is a method that creates a new user in the database
    name,
    email,
    phone,
    password,
    role,
  });

//   res.status(201).json({    //res.status() is a method that sets the HTTP status for the response. It takes one parameter: the status code
//     success: true,
//     message: "User Registered!",
//     user,  //user is an object that contains the user information
//   });

  sendToken(user, 201, res, "User Registered!");
});

// export const login = catchAsyncErrors(async (req, res, next) => {
//   const { email, password, role } = req.body;
//   if (!email || !password || !role) {
//     return next(new ErrorHandler("Please provide email ,password and role."));
//   }
//   const user = await User.findOne({ email }).select("+password");
//   if (!user) {
//     return next(new ErrorHandler("Invalid Email Or Password.", 400));
//   }
//   const isPasswordMatched = await user.comparePassword(password);
//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Invalid Email Or Password.", 400));
//   }
//   if (user.role !== role) {
//     return next(
//       new ErrorHandler(`User with provided email and ${role} not found!`, 404)
//     );
//   }
//   sendToken(user, 201, res, "User Logged In!");
// });

// export const logout = catchAsyncErrors(async (req, res, next) => {
//   res
//     .status(201)
//     .cookie("token", "", {
//       httpOnly: true,
//       expires: new Date(Date.now()),
//     })
//     .json({
//       success: true,
//       message: "Logged Out Successfully.",
//     });
// });


// export const getUser = catchAsyncErrors((req, res, next) => {
//   const user = req.user;
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });