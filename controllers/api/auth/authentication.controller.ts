import { Request, Response, Router } from "express";
import { IOTP } from "../../../models/Interfaces/otp.interface";
import { Error, ConnectionStates } from "mongoose";
import { AuthBussiness } from "../../../bussinessLogic/auth.business";
import AuthMiddlewares from "../../../server/middlewares/authMiddlewares/auth.base.middlware";
interface IsystemOTP {
  OTP: Number;
  time: Date;
}

interface UserResults {
  isActive: Boolean;
  tokens: Array<String>;
  expiresIn: String;
}

interface IsystemOTPSchema extends Array<IsystemOTP> {}

class Authentication {
  private _router: Router;
  /*
  TEMP STORAGE SYSTEM FOR OTP
  @parems : {otp:Number,phoneNumber:Number}
  */
  public _systemOTP: IsystemOTPSchema;

  constructor(router: Router) {
    const multerUpload = new AuthBussiness();
    this._router = router;
    this._router.post("/signup", this.signUp);
    this._router.post("/verify", this.verify);
    this._router.post("/login", this.login);
    this._router.post(
      "/upload",
      multerUpload.uploadMular().single("photo"),
      this.upload
    );
    this._systemOTP = [];
  }

  /*
@parems {
  phoneNumber: Number,
}
*/

  public signUp = async (req: Request, res: Response, next) => {
    const OTP = await this._sendOTP(req.body.phoneNumber);
    console.log("OTP_IO_UNIT");
    console.log(OTP);
    if (OTP !== undefined) {
      res.status(200).send({
        message: "OTP sended successfully",
        number: req.body.phoneNumber,
        ok: true,
      });
    } else {
      res.status(400).send({ message: new Error("OTP MUST BE A NUMBER") });
    }
  };

  /*
@parems {
  phoneNumber: Number,
}
*/
  public login = async (req: Request, res: Response, next) => {
    const OTP = await this._sendOTP(req.body.phoneNumber);
    console.log("OTP_IO_UNIT");
    console.log(OTP);
    if (OTP !== undefined) {
      res.status(200).send({
        message: "OTP sended successfully",
        number: req.body.phoneNumber,
        ok: true,
      });
    } else {
      res.status(500).send("Something broke!");
    }
  };

  /*
@parems {
  otp:Number,
  phoneNumber: Number,
  fullName?:String
}
*/

  public verify = async (req: Request, res: Response, next) => {
    if (this._systemOTP !== undefined) {
      const userInputOTP: number = Number(req.body.otp);
      const systemOTPObject: IsystemOTP = this._systemOTP[req.body.phoneNumber];
      if (systemOTPObject !== undefined) {
        const systemOTP = systemOTPObject.OTP;
        if (userInputOTP === systemOTP && systemOTPObject.OTP !== undefined) {
          const authLogic = new AuthBussiness();
          try {
            if (Boolean(req.body.fullName)) {
              console.log(
                "in signup section .................................."
              );
              try {
                const results = await authLogic.handleSingup(req.body);
                res.status(201).send({
                  message: "Account Created !!",
                  user_data: JSON.parse(JSON.stringify(results)),
                  moveto: "login",
                });
              } catch (err) {
                console.log(err);
                if (err == "account_exists") {
                  res.status(400).send({
                    message: "Account Already Exists !!",
                    moveto: "login",
                  });
                } else {
                  res.status(500).send({
                    message: "Internal Error Contact Admin !!",
                    moveto: "signup",
                  });
                }
              }
            } else {
              console.log("in login section....");
              try {
                let results = await authLogic.handleLogin(req.body);

                const user_results: UserResults = JSON.parse(
                  JSON.stringify(results)
                );

                console.log(user_results);

                if (user_results.isActive) {
                  res.status(209).send({
                    message: "logged in succesfully you need ....",
                    tokens: user_results.tokens,
                    moveto: "user_account",
                    expiresIn: user_results.expiresIn,
                  });
                } else {
                  res.status(401).send({
                    message:
                      "Your account is not active please contact to Admin ....",
                    tokens: user_results.tokens,
                    moveto: "verify_accounts",
                  });
                }
              } catch (err) {}
            }
          } catch (err) {
            console.log(
              "here are fine conditions for adding error handeling module................................ "
            );
            res.status(500).send({ message: JSON.stringify(err) });
          }
        } else {
          res.status(401).send(
            JSON.stringify({
              message: "OTP not matched please try again...",
            })
          );
        }
      } else {
        res
          .status(500)
          .send({ message: "INTERNAL_ERROR :: OTP_STORAGE_UNIT_RESET" });
      }
    } else {
      res
        .status(500)
        .send({ message: "INTERNAL_ERROR ::OTP_STORAGE_MEMORY_UNIT" });
    }
  };

  private _sendOTP = async (phoneNumber: number) => {
    const OTPLogic = new AuthBussiness();
    const input: IOTP = { phoneNumber: Number(phoneNumber) };
    try {
      console.log(input);
      let OTP = await OTPLogic.sendOTP(input);
      this._systemOTP[phoneNumber] = { OTP: OTP, time: new Date() };
      return OTP;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  public upload = async (req: Request, res: Response, next) => {
    res.status(200).json(req["file"]);
    const UplaodBussiness = new AuthBussiness();
    // UplaodBussiness.upload(req.body);
  };
}

module.exports = Authentication;
