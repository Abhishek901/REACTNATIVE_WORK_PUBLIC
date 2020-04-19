import {RepositoryBase} from './base/repository.base';
import {UserModel} from '../models/user.model';
import UserSchemaModel from '../dataAccess/Schemas/user.schema';
import {IUserInterface} from '../models/Interfaces/user.interface'

export class UserRepository extends RepositoryBase<IUserInterface>{
    constructor(){
        super(UserSchemaModel);
    }
} 

Object.seal(UserRepository);