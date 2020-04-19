import {RoleRepository} from '../repository/role.repository';
import {IRoleBussiness} from './interfaces/role.bussiness.inteface';
import {IRole} from '../models/Interfaces/role.interface';

export class RoleBussiness implements IRoleBussiness{
    private _roleRepository : RoleRepository;
    constructor(){
        this._roleRepository = new RoleRepository();
    }

    async create(item : IRole ){
      const res = await this._roleRepository.create(item);
      return res;
    } 

    async update(id:String , item :IRole){
     const res = await this._roleRepository.update(id,item);
     return res;
    }

    async find(item:IRole){
        return this._roleRepository.find(item)
    }

    async findOne(itemId:String){
       return this._roleRepository.findOne(itemId);
    }

    async delete(itemId:String){
        return this._roleRepository.delete(itemId);
    }
}
