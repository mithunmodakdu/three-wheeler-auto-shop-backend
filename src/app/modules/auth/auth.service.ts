import AppError from "../../errorHelpers/appError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatusCodes from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { envVars } from "../../config/env";

const credentialsLogin = async(payload: Partial<IUser>) =>{
  const {email, password} = payload;

  const isUserExist = await User.findOne({email});

  if(!isUserExist){
    throw new AppError(httpStatusCodes.BAD_REQUEST, "Email does not exist.")
  }

  const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string);
  
  if(!isPasswordMatched){
    throw new AppError(httpStatusCodes.BAD_REQUEST, "Password does not match.")
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role
  }

  const accessToken = jwt.sign(jwtPayload, envVars.JWT_WEB_SECRET, {expiresIn: "1d"});

  return {
    email: isUserExist.email,
    accessToken
  }
}

export const AuthServices = {
  credentialsLogin
}