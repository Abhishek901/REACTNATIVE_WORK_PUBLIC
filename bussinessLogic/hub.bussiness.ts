import { HubRepository } from "../repository/hub.repository";
import { IHunBussiness } from "./interfaces/hub.bussiness.interface";
import { IHubInterface } from "../models/Interfaces/hub.interface";

export class HubBussiness implements IHunBussiness {
  private _HubRepository: HubRepository;

  constructor() {
    this._HubRepository = new HubRepository();
  }

  create(item: IHubInterface, callback: (error: any, result: any) => void) {
    this._HubRepository.create(item, callback);
  }

  update(
    _id: string,
    item: IHubInterface,
    callback: (error: any, result: any) => void
  ) {
    this._HubRepository.findOne(_id, (err, res) => {
      if (err) callback(err, res);
      else this._HubRepository.update(res._id, item, callback);
    });
  }

  find(
    callback: (error: any, result: Array<IHubInterface>) => void,
    queryObject = {},
    withOption: boolean = false
  ) {
    withOption
      ? this._HubRepository.findByOption(callback, queryObject)
      : this._HubRepository.find(callback);
  }

  findByPopulate = (callback, query, refkey) => {
    this._HubRepository.findByPopulateRole(callback, query, refkey);
  };

  findOne(_id: string, callback: (error: any, result: IHubInterface) => void) {
    this._HubRepository.findOne(_id, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._HubRepository.delete(_id, callback);
  }

  findOneAndUpdate(
    _id: string,
    doc,
    callback: (error: any, result: any) => void
  ) {
    this._HubRepository.findOneAndUpdate(_id, doc, callback);
  }
}
