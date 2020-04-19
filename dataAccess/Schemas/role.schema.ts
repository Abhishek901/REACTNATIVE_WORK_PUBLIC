import {mongooseInstance,mongooseConnection} from '../db/db';
import {IRole} from '../../models/Interfaces/role.interface';


const RoleSchema = new mongooseInstance.Schema({
    role_name:{
        type:String,
        required:true,
        maxlength:225
    },
    permissions:{
        type:[String],
        required:true
    },
    created_at:{
        type:Date,
    },
    updated_at:{
        type:Date, 
    }
}).pre<IRole>('save',function (next){
    console.log('here in role middleware hook.......................................')
    console.log(this.isNew);
    if(this.isNew){
        this.created_at = new Date();
    }else{
        this.updated_at = new Date();
    }
    next()
});

const schemModel = mongooseConnection.model<IRole>("Role",RoleSchema);
export default schemModel;