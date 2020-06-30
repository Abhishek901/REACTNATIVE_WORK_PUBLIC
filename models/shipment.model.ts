import { IShipmentInterface } from './Interfaces/shipment.interface';

export class ShipmentModel {
    private _shipmentModel: IShipmentInterface;
    constructor(shipmentModel: IShipmentInterface) {
        this._shipmentModel = shipmentModel
    }
}
Object.seal(ShipmentModel);