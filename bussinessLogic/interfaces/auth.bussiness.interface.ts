import { IUserInterface } from "../../models/Interfaces/user.interface";

export interface IAuthBussiness<T> {
  sendOTP(input: T): Promise<Object>;
  handleSingup(user: IUserInterface): Promise<Object>;
}
