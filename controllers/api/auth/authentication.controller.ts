import {Request,Response,Router} from 'express';
import  * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import { IUserInterface } from '../../../models/Interfaces/user.interface';
import { IOTP } from '../../../models/Interfaces/otp.interface';
import { Error } from 'mongoose';
import {OTPBussiness} from '../../../bussinessLogic/otp.business';


class Authentication  {
    private _router : Router;
    private _systemOTP :()=>Number;

    constructor(router:Router){
        this._router = router;
        this._router.post('/', this.signUp);
        this._router.post('/verify',this.verify);
        this._systemOTP = undefined;
        
    }

    public signUp = async (req:Request,res:Response,next) =>{

      const OTPLogic = new OTPBussiness();
      const input:IOTP = {phoneNumber:req.body.phoneNumber}
      try{

        let getOTP = await OTPLogic.sendOTP(input);
        this._systemOTP = function(){
            return getOTP
        }
        req.session.otp = getOTP;
        
        if(getOTP !== undefined && typeof getOTP == "number"){
            res.status(200).send({message:'OTP sended successfully',ok:true});
        }else{
            res.status(400).send({message:new Error('OTP MUST BE A NUMBER')});
        }
      }catch(err){
         res.status(500).send(new Error('Unable to send OTP'));
      }
      
    }


    public verify = (req:Request,res:Response,next) => {
        const userInputOTP:number = Number(req.body.otp);
        let systemOTP = this._systemOTP();
       
        if(userInputOTP !== systemOTP){
            res.status(401).send({message:"OTP NOT MATCHED"});
        }else{
            res.status(200).send({message:"OTP MATCHED"});
        }
    }

    private _createTokens = async (user:IUserInterface)=>{
        
        const createToken = jwt.sign({
            user:_.pick(user,['_id','role']),
        },process.env.CLINT_SECRATE_KEY_1,{
            expiresIn:'1m'
        });

        const createReffreshToken = jwt.sign(
            {
                user:_.pick(user,['_id']),
            },
            process.env.CLINT_SECRATE_KEY_2,
            {
              expiresIn:'7d'
            }
        );

        return Promise.all([createToken,createReffreshToken]);
    }   
    
    


}

module.exports = Authentication;