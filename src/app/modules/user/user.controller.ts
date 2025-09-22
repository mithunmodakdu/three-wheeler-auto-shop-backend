import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCodes from "http-status-codes";


const createUser = catchAsync(
  async(req: Request, res: Response) =>{
    const user = await UserServices.createUser(req.body);
    sendResponse(res, {
      statusCode: httpStatusCodes.CREATED,
      success: true,
      message: "User created successfully",
      data: user
    });
  }
);

const getAllUsers = catchAsync(
  async(req: Request, res: Response) =>{
    const users = await UserServices.getAllUsers();
    sendResponse(res, {
      statusCode: httpStatusCodes.OK,
      success: true,
      message: "All users got successfully",
      data: users
    })
  }
);



export const userControllers = {
  createUser,
  getAllUsers
}