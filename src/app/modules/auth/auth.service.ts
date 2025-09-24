import { IUser } from "../user/user.interface";

const credentialsLogin = async(payload: Partial<IUser>) =>{
  console.log(payload)
}

export const AuthServices = {
  credentialsLogin
}