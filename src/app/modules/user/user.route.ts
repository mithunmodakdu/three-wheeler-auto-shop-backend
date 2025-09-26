import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
import AppError from "../../errorHelpers/appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { ERole } from "./user.interface";

const router = Router();

router.post("/register",
  validateRequest(createUserZodSchema),
  userControllers.createUser
);
router.get("/get-all-users",
  async(req: Request, res: Response, next: NextFunction)=>{
    try {
      const accessToken = req.headers.authorization;

      if(!accessToken){
        throw new AppError(403, "No access Token recieved.")
      }

      const verifiedAccessToken = jwt.verify(accessToken, envVars.JWT_WEB_SECRET);
      console.log(verifiedAccessToken); 

      if((verifiedAccessToken as JwtPayload).role !== ERole.ADMIN || ERole.SUPER_ADMIN){
        throw new AppError(403, "You are not permitted to view this route")
      }

      next();

    } catch (error) {
      next(error)
    }
  },
  userControllers.getAllUsers)

export const UserRoutes = router; 