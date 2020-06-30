import { IRole } from "./Interfaces/role.interface";
export class Role {
  private _roleModel: IRole;

  constructor(roleModel: IRole) {
    this._roleModel = roleModel;
  }

  get roleName(): String {
    return this._roleModel.role_name;
  }

  get permission(): Object {
    return this._roleModel.permissions;
  }

  set roleName(value) {
    this._roleModel.role_name = value;
  }

  set permission(value: Object) {
    this._roleModel.permissions = value;
  }
}

Object.seal(Role);
