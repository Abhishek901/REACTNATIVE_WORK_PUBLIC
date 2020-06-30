import { mongooseInstance, mongooseConnection } from "../db/db";
import { IShipmentInterface } from "../../models/Interfaces/shipment.interface";

const ShipmentSchema = new mongooseInstance.Schema({
    hub_id: {
        type: mongooseInstance.Schema.Types.ObjectId,
        required: "{PATH} is required",
        ref: "hubs",
    },
    user_id: {
        type: mongooseInstance.Schema.Types.ObjectId,
        required: "{PATH} is required",
        ref: "users",
    },
    status: {
        type: String
    },
    comment: {

    },
    paymentMode: {
        type: String
    },
    vendor_name: {
        type: String
    },
    shipment_cost: {
        type: mongooseInstance.Schema.Types.Decimal128
    },
    recieved_date: {
        type: Date
    },
    user_info: {
        type: Array
    },
    created_at: {
        type: Date,
        required: false,
    },
    updated_at: {
        type: Date,
        required: false,
    },
}).pre<IShipmentInterface>("save", function (next) {
    if (this.isNew) {
        this.created_at = new Date();
        this.recieved_date = new Date();
    } else {
        this.updated_at = new Date();
    }
    next();
});
const schemaModel = mongooseConnection.model<IShipmentInterface>(
    "Shipment",
    ShipmentSchema
);
export default schemaModel;
