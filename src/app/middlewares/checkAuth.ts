import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...authRoles: string[]) => async(req: Request, res: Response, next: NextFunction)=>{
    try {
      const accessToken = req.headers.authorization;
      console.log(accessToken); 

      if(!accessToken){
        throw new AppError(403, "No access Token recieved.")
      }

      const verifiedAccessToken = verifyToken(accessToken, envVars.JWT_WEB_SECRET) as JwtPayload;
      console.log((verifiedAccessToken as JwtPayload).role); 

      if(!authRoles.includes(verifiedAccessToken.role)){
        throw new AppError(403, "You are not permitted to view this route")
      }

      next();

    } catch (error) {
      next(error)
    }
  }