import { RepositoryBase } from "./base/repository.base";
import { IRole } from "../models/Interfaces/role.interface";
import RoleSchemModel from "../dataAccess/Schemas/role.schema";
import { Role } from "../models/role.model";

export class RoleRepository extends RepositoryBase<IRole> {
  constructor() {
    super(RoleSchemModel);
  }
}

Object.seal(RoleRepository);
