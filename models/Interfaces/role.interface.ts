import { Document, Schema } from "mongoose";

export interface IRole extends Document {
  role_name: String;
  permissions: Object;
  created_at: Date;
  updated_at: Date;
}
