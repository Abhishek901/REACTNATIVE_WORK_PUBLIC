import { mongooseInstance, mongooseConnection } from "../db/db";
import { IHubInterface } from "../../models/Interfaces/hub.interface";
const HubSchema = new mongooseInstance.Schema({
    hub_name: {
        type: String,
        required: "{PATH} is required",
    },
    hub_address: {
        type: String,
        required: "{PATH} is required",
    },
    hub_owner_name: {
        type: String
    },
    hub_owner_number: {
        type: Number
    },
    created_at: {
        type: Date,
        required: false,
    },
    updated_at: {
        type: Date,
        required: false,
    },
}).pre<IHubInterface>("save", function (next) {
    if (this.isNew) {
        this.created_at = new Date();
    } else {
        this.updated_at = new Date();
    }
    next();
});
const schemaModel = mongooseConnection.model<IHubInterface>(
    "hubs",
    HubSchema
);
export default schemaModel;
