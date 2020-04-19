import { IOTPBussiness } from './interfaces/otp.bussiness.interface';
import { IOTP } from '../models/Interfaces/otp.interface';
import fetch from 'node-fetch';
export class OTPBussiness implements IOTPBussiness<IOTP>{

     
      private generateOTP = (count:number) =>{
        return (Math.floor(Math.random()*8)+1)*1000 + Math.floor(Math.random()*1000);
      };

      public sendOTP = async (input:IOTP) =>{      
        //console.log(input);
         const otp = this.generateOTP(Number(process.env.OTP_COUNT));
         const phoneNumber:number = Number(input.phoneNumber);
         let fetchPointer = await fetch(`https://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=${phoneNumber}&msg=${process.env.MESSAGE}${otp}.%20Please%20enter%20this&msg_type=TEXT&userid=${process.env.MESSAGE_API_USERID}&auth_scheme=plain&password=${process.env.MESSAGE_API_PASSWORD}&v=1.1&format=text`);
         const response = await fetchPointer;
         const sendOTPRequest = new Promise<number>((resolve,reject)=>{
          if(response.status != 200 && response.statusText != 'OK'){
            reject('Unable to sent the OTP')
          }else{
            resolve(otp);
          }
         });
         
        return sendOTPRequest;
         
       };
     
    

}

