import express from "express";
import {register,login,logout,getuser} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);    //router.post() is a method that is used to handle the POST requests. It takes two parameters: the path and the function to be executed when the path is matched
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

export default router;
