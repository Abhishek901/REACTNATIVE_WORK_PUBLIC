import {Document,Schema} from 'mongoose';

export interface IRole extends Document{
    
    role_name:String;
    permissions:Array<String>;
    created_at:Date;
    updated_at:Date;
}