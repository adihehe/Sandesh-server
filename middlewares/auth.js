import { TryCatch } from "./error.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { adminSecretKey } from "../app.js";

export const isAuthenticated = TryCatch((req,res,next)=>{
    const token = req.cookies["chat-token"];
    if (!token)
        return next(new ErrorHandler("Please login to access this route", 401));
    
    const val = jwt.verify(token, process.env.JWT_SECRET);

    req.user = val._id;

    next();

})

export const adminOnly = (req, res, next) => {
    const token = req.cookies["chattu-admin-token"];
  
    if (!token)
      return next(new ErrorHandler("Only Admin can access this route", 401));
  
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);
  
    const isMatched = secretKey === adminSecretKey;
  
    if (!isMatched)
      return next(new ErrorHandler("Only Admin can access this route", 401));
  
    next();
  };

  export const socketAuthenticator = async (err, socket, next) => {
    try {
      if (err) return next(err);
  
      const authToken = socket.request.cookies["chat-token"];
  
      if (!authToken)
        return next(new ErrorHandler("Please login to access this route", 401));
  
      const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);
  
      const user = await User.findById(decodedData._id);
  
      if (!user)
        return next(new ErrorHandler("Please login to access this route", 401));
  
      socket.user = user;
  
      return next();
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Please login to access this route", 401));
    }
  };