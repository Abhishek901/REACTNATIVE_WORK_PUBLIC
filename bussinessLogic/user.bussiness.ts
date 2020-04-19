import {UserRepository} from '../repository/user.repository';
import {IUserBussiness} from './interfaces/user.bussiness.interface';
import {IUserInterface} from '../models/Interfaces/user.interface';


export class UserBussiness implements IUserBussiness{
     private _userRepository : UserRepository ;

     constructor(){
         this._userRepository = new UserRepository();
     }

     async create(item:IUserInterface){
         const res = await this._userRepository.create(item);
         return res;
     }

     async update(id:String, item:IUserInterface ){
        const res = await this._userRepository.update(id,item);
        return res;
     }
    
     async find(item:IUserInterface){
        return this._userRepository.find(item);
     }

     async findOne(itemID:String){
        return this._userRepository.findOne(itemID); 
     }

     async delete(itemID:string){
        return this._userRepository.delete(itemID);
     }


}