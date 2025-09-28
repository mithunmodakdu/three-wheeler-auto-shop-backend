import { envVars } from "../../config/env";
import { IAuthProvider, IUser } from "./user.interface"
import bcryptjs from "bcryptjs";
import { User } from "./user.model";
import { JwtPayload } from "jsonwebtoken";

const createUser = async(payload: Partial<IUser>) =>{
  const {email, password, ...rest} = payload;

  const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string
  }

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest
  });

  return user;
  
}

const updateUser = async(userId: string, payload: Partial<IUser>, decodedToken: JwtPayload ) =>{

  const userToUpdate = await User.findById(userId as string);

  if(!userToUpdate){
    throw new 
  }
}

export const UserServices = {
  createUser
}