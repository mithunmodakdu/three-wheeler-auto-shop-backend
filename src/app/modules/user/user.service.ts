import { IUser } from "./user.interface"

const createUser = async(payload: Partial<IUser>) =>{
  const {email, password, ...rest} = payload;
  
}

export const UserServices = {
  createUser
}