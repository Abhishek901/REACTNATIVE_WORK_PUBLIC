import { Schema, Document } from "mongoose";

export interface IShipmentInterface extends Document {
  hub_id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
  FHRID: Number;
  shipment_id: String;
  status: String;
  paymentMode: String;
  recieved_date: Date;
  vendor_name: String;
  shipment_cost: Schema.Types.Decimal128;
  comment: String;
  user_info: [
    {
      cust_name: String;
      street: String;
      address1: String;
      address2: String;
      city: String;
      state: String;
      zip: Number;
      phoneNumber: Number;
    }
  ];
  created_at: Date;
  updated_at: Date;
}
