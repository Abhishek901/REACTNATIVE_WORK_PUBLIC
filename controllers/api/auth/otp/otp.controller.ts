import {Request,Response,Router} from 'express';
import {OTPBussiness} from '../../../../bussinessLogic/otp.business';
import {IOTP} from '../../../../models/Interfaces/otp.interface';

class OTPController {

    private _router:Router;

    constructor(router:Router){
         this._router = router;
         this._router.post('/',this.sendOTP);
    }
    
    sendOTP = async (req:Request,res:Response)=>{
        const input = <IOTP>req.body;
        const OTPLogic = new OTPBussiness();
        try{
          const result = await OTPLogic.sendOTP(input);
          res.status(200).send(JSON.stringify(result));
        }catch(err){
          res.status(500).send(new Error('Error in sending OTP please try agine.....'));
        }
        
    }

}

module.exports = OTPController;