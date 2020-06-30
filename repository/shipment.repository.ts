import { RepositoryBase } from "./base/repository.base";
import { IShipmentInterface } from "../models/Interfaces/shipment.interface";
import ShipmentSchemModel from "../dataAccess/Schemas/shipment.schema";
import UserModel from "../dataAccess/Schemas/user.schema";
import HubModel from "../dataAccess/Schemas/hub.schema";
export class ShipmentRepository extends RepositoryBase<IShipmentInterface> {
    constructor() {
        super(ShipmentSchemModel);
    }
    findByMultiplePopulate = (callback, query, refKeys) => {
        let counter = 0;
        let refArray = [];
        const ModelArray = [HubModel, UserModel];
        refArray = refKeys.map((ref) => {
            const refArray = { path: ref, Model: ModelArray[counter] }
            counter++;
            return refArray
        })
        console.log('----------------------------------')
        console.log(refArray);
        this.findByMultiplePopulateBase(callback, query, refArray)

    };
}
Object.seal(ShipmentRepository);
