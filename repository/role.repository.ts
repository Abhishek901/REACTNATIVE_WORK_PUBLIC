import {RepositoryBase} from './base/repository.base';
import RoleSchemaModel from '../dataAccess/Schemas/role.schema';
import {IRole} from '../models/Interfaces/role.interface';

export class RoleRepository extends RepositoryBase<IRole>{
    constructor(){
        super(RoleSchemaModel);
    }
}  

Object.seal(RoleRepository);