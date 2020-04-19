import {Document} from 'mongoose';
export default interface write<T>{
    create(item:T):Promise<Document>;
    update(id:String,item:T):Promise<Document>;
    delete(id:String):Promise<Document>;
}   