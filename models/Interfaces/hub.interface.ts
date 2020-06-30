import { Schema, Document } from "mongoose";

export interface IHubInterface extends Document {
    hub_name: String;
    hub_address: String;
    hub_owner_name: String
    hub_owner_number: Number
    created_at: Date;
    updated_at: Date;
}
