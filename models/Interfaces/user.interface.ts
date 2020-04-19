import {Schema, Document} from "mongoose";

export interface IUserInterface extends Document{
  fullName:String;
  phoneNumber:Number;
  role:Schema.Types.ObjectId;
  creaedAt:Date;
  address:[{
      street:String,
      city:String,
      state:String,
      zip:Number
  }];
  created_at:Date;
  updated_at:Date  
}
