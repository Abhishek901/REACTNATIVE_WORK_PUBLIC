import { ShipmentRepository } from "../repository/shipment.repository";
import { IShipmentBussiness } from "./interfaces/shipment.bussiness.interface";
import { IShipmentInterface } from "../models/Interfaces/shipment.interface";

export class ShipmentBussiness implements IShipmentBussiness {
  private _shipmentRepository: ShipmentRepository;

  constructor() {
    this._shipmentRepository = new ShipmentRepository();
  }

  create(item: IShipmentInterface, callback: (error: any, result: any) => void) {
    this._shipmentRepository.create(item, callback);
  }

  update(
    _id: string,
    item: IShipmentInterface,
    callback: (error: any, result: any) => void
  ) {
    this._shipmentRepository.findOne(_id, (err, res) => {
      if (err) callback(err, res);
      else this._shipmentRepository.update(res._id, item, callback);
    });
  }

  find(
    callback: (error: any, result: Array<IShipmentInterface>) => void,
    queryObject = {},
    withOption: boolean = false
  ) {
    withOption
      ? this._shipmentRepository.findByOption(callback, queryObject)
      : this._shipmentRepository.find(callback);
  }

  findByMultiplePopulate(callback,query,refKeyArray) {
   this._shipmentRepository.findByMultiplePopulate(callback,query,refKeyArray)
  }


  findOne(_id: string, callback: (error: any, result: IShipmentInterface) => void) {
    this._shipmentRepository.findOne(_id, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._shipmentRepository.delete(_id, callback);
  }

  findOneAndUpdate(_id: string, doc, callback: (error: any, result: any) => void) {
    this._shipmentRepository.findOneAndUpdate(_id, doc, callback)
  }
}
