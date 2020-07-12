import { Schema, Document } from "mongoose";

export interface IReportInterface extends Document {
  RunsheetId: Number;
  ShipmentUpdateDateTime: Date;
  AgentName: String;
  FHRID: Number;
  Vendor: String;
  DeliveryHub: String;
  City: String;
  Zone: String;
  State: String;
  RunSheetStatus: String;
  ShipmentId: Number;
  ShipmentType: String;
  ShipmentPrice: Number;
  ShipmentWeight: Schema.Types.Decimal128;
  ShipmentStatus: String;
  SheetType: String;
  SheetCreateDateTime: Date;
  CustomerFeedBackResponse: String;
  IsSellerReturn: Boolean;
  created_at: Date;
  updated_at: Date;
}
