import {IRole} from './Interfaces/role.interface';

export class Role{
  private _roleModel:IRole;

  constructor(roleModel:IRole){
    this._roleModel = roleModel;
  }

  get roleName():String{
    return this._roleModel.role_name;
  }

  get permissions():Array<String>{
    return this._roleModel.permissions;
  }
}  

Object.seal(Role);


