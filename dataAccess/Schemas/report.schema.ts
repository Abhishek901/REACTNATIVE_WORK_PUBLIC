import { mongooseInstance, mongooseConnection } from "../db/db";
import { IReportInterface } from "../../models/Interfaces/report.interface";

const ReportSchema = new mongooseInstance.Schema({
  RunsheetId: { type: Number },
  ShipmentUpdateDateTime: { type: Date },
  AgentName: { type: String },
  FHRID: { type: Number },
  Vendor: { type: String },
  DeliveryHub: { type: String },
  City: { type: String },
  Zone: { type: String },
  State: { type: String },
  RunSheetStatus: { type: String },
  ShipmentId: { type: Number },
  ShipmentType: { type: String },
  ShipmentPrice: { type: Number },
  ShipmentWeight: { type: mongooseInstance.Schema.Types.Decimal128 },
  ShipmentStatus: { type: String },
  SheetType: { type: String },
  SheetCreateDateTime: { type: Date },
  CustomerFeedBackResponse: { type: String },
  IsSellerReturn: { type: Boolean },
  created_at: { type: Date },
  updated_at: { type: Date },
}).pre<IReportInterface>("save", function(next) {
  if (this.isNew) {
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});
const schemaModel = mongooseConnection.model<IReportInterface>(
  "reports",
  ReportSchema
);
export default schemaModel;
