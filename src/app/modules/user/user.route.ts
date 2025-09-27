import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
import AppError from "../../errorHelpers/appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { ERole } from "./user.interface";
import { verifyToken } from "../../utils/jwt";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post("/register",
  validateRequest(createUserZodSchema),
  userControllers.createUser
);

router.get("/all-users",
  checkAuth(ERole.ADMIN, ERole.SUPER_ADMIN),
  userControllers.getAllUsers)

export const UserRoutes = router; 