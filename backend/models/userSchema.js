import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";                 //importing jwt for generating token
const userSchema = new mongoose.Schema({      //creating a schema for user
  name: {
    type: String,
    required: [true, "Please enter your Name!"],   //if name is not entered, it will show this message.true: This means that the field is required
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],    //validator is likely a reference to the validator library,
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false,    //select: false means that the password will not be returned in the response when we make a request to the server
  },
  role: {
    type: String,
    required: [true, "Please select a role"],
    enum: ["Job Seeker", "Employer"],   //enum is used to restrict the value of a field to a set of predefined values
  },
  createdAt: {
    type: Date,
    default: Date.now,  //default value for createdAt is the current date and time
  },
});


//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre("save", async function (next) {    //pre is a middleware that runs before the save method is called
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);    //bcrypt is a library for hashing passwords in Node.js.
});

//COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {       //comparePassword is a method that we will use to compare the password entered by the user with the password saved in the database
  return await bcrypt.compare(enteredPassword, this.password);         //bcrypt.compare() is a method that compares the entered password with the saved password and returns a boolean value
};

//GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH. 
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 2, // expires in 2 days
  });
};

export const User = mongoose.model("User", userSchema);   //exporting the User model
export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};