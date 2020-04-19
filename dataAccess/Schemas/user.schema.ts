import {mongooseInstance,mongooseConnection} from '../db/db';
import {IUserInterface} from '../../models/Interfaces/user.interface';

const UserSchema = new mongooseInstance.Schema({
    fullName:{
      required:[true,"Please enter your full name"],
      type:String,
      maxlength:225
    },
    phoneNumber:{
      type:Number,
      required:true,
      max:[10,'Wrong Phone number contain more then 10 digits'],
      min:[10,'Wrong Phone number contain less then 10 digits']
    },
    role:{
      type:mongooseInstance.Schema.Types.ObjectId,
      required:true,
      ref:'Role'
    },
    address:[{
      street:{type:String,maxlength:225,required:true},
      city:{type:String,maxlength:225,required:true},
      state:{type:String,maxlength:225,required:true},
      zip:{type:Number,max:5,required:true}
    }],
    isActive:{
      type:Boolean,
      default:false
    },
    created_at: {
      type: Date,
      required: false
    },
    updated_at: {
      type: Date,
      required: false
   }
  }).pre<IUserInterface>('save',function(next){
    if(this.isNew){
      this.created_at = new Date();
    }else{
      this.updated_at = new Date();
    }
    next();
  })

const schemaModel = mongooseConnection.model<IUserInterface>("Users",UserSchema)  
export default schemaModel;