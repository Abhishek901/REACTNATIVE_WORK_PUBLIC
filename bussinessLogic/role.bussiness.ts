import { RoleRepository } from "../repository/role.repository";
import { IRoleBussiness } from "./interfaces/role.bussiness.inteface";
import { IRole } from "../models/Interfaces/role.interface";
export class RoleBussiness implements IRoleBussiness {
  private _roleRepository: RoleRepository;
  constructor() {
    this._roleRepository = new RoleRepository();
  }

  create(item: IRole, callback: (error: any, result: any) => void) {
    item.role_name = `${process.env.USER_ROLL_SUFFICS}_${item.role_name}`;
    this._roleRepository.create(item, callback);
  }

  update(
    _id: string,
    item: IRole,
    callback: (error: any, result: any) => void
  ) {
    this._roleRepository.findOne(_id, (err, res) => {
      if (err) callback(err, res);
      else this._roleRepository.update(res._id, item, callback);
    });
  }

  find(
    callback: (error: any, result: any) => void,
    queryObject = {},
    withQuery = false
  ) {
    withQuery
      ? this._roleRepository.findByOption(callback, queryObject)
      : this._roleRepository.find(callback);
  }

  findOne(_id: string, callback: (error: any, result: IRole) => void) {
    this._roleRepository.findOne(_id, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._roleRepository.delete(_id, callback);
  }
}
