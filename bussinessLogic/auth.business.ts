import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import { IUserInterface } from "../models/Interfaces/user.interface";
import { IAuthBussiness } from "./interfaces/auth.bussiness.interface";
import { UserBussiness } from "./user.bussiness";
import { RoleBussiness } from "./role.bussiness";
import { Role } from "../models/role.model";
import { IOTP } from "../models/Interfaces/otp.interface";
import fetch from "node-fetch";
import * as multer from 'multer';
const uuidv4 = require('uuid-v4');
import * as path from 'path';

interface UserResults {
  isActive: Boolean,
  tokens: Array<String>
}
export class AuthBussiness implements IAuthBussiness<IOTP> {
  private generateOTP = (count: number) => {
    // console.log(count);
    return (
      (Math.floor(Math.random() * 8) + 1) * 1000 +
      Math.floor(Math.random() * 1000)
    );
  };

  public sendOTP = async (input: IOTP) => {
    //console.log(input);
    const otp = this.generateOTP(Number(process.env.OTP_COUNT));

    const phoneNumber: number = Number(input.phoneNumber);
    console.log('before request')
    let fetchPointer = await fetch(
      `https://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=${phoneNumber}&msg=${process.env.MESSAGE}${otp}.%20Please%20enter%20this&msg_type=TEXT&userid=${process.env.MESSAGE_API_USERID}&auth_scheme=plain&password=${process.env.MESSAGE_API_PASSWORD}&v=1.1&format=text`
    );
    const response = await fetchPointer;
    const sendOTPRequest = new Promise<number>((resolve, reject) => {
      if (response.status != 200 && response.statusText != "OK") {
        reject("Unable to sent the OTP");
      } else {
        resolve(otp);
      }
    });

    return sendOTPRequest;
  };

  public handleLogin = (user: IUserInterface) => {
    console.log('Hadeling Login .........................................')
    const phoneNumber = user.phoneNumber;
    return new Promise(async (resolve, reject) => {
      try {
        const user_exists = await this._checkExist(phoneNumber);
        if (user_exists === true) {
          const getUserLogic = new UserBussiness();
          getUserLogic.findByPopulate(
            async (err, result) => {
              if (err) {
                reject(err);
              }
              const tokens = await this._createTokens(result);
              const user_results: UserResults = { tokens: tokens, isActive: result[0].isActive }
              resolve(user_results);
            },
            { phoneNumber: phoneNumber },
            "role"
          );
        } else if (user_exists === false) {
          reject("You don't have any account please create one");
        } else if (user_exists == "multiple_account_found") {
          reject("multiple account found please contact to ADMINSTRATOR");
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  public handleSingup = async (user: IUserInterface) => {
    console.log('Hadeling signup .........................................')
    const results = await this._checkExist(user.phoneNumber);
    console.log(results);
    return new Promise((resolve, reject) => {
      if (results == false) {
        try {
          const InitialRoleName = `${process.env.USER_ROLL_SUFFICS}_${process.env.INITIALROLENAME}`;
          const InitialRoleLogic = new RoleBussiness();
          InitialRoleLogic.find(
            (err, results) => {
              if (err) {
                reject(err);
              }
              if (results.length > 0) {
                const roleId = results[0]._id;
                const AddUserLogic = new UserBussiness();
                user.role = roleId;
                AddUserLogic.create(user, (err, result) => {
                  if (err) {
                    console.log('here in adding user first time with error......')
                    reject(err);
                  }
                  console.log('here in adding user first time successfully......')
                  return resolve(result);
                });
              } else {
                reject("Role is not setup....");
              }
            },
            { role_name: InitialRoleName },
            true
          );
        } catch (err) {
          reject("Internal Error!!! Need Debugging O.B.C::49");
        }
      } else if (results == "multiple_account_found") {
        reject("multiple account found please contact to ADMINSTRATOR");
      } else {
        reject("account_exists");
      }
    });
  };

  private _checkExist = async (phoneNumber: Number) => {
    const user = new UserBussiness();
    const queryObject = { phoneNumber: phoneNumber };
    console.log('checking for existance of account here.....')
    return new Promise((resolve, reject) => {
      user.find(
        (err, result: Array<IUserInterface>) => {
          if (err) {
            reject(err)
          }
          //console.log(result);
          if (result.length == 1) {
            resolve(true);
          } else if (result.length > 1) {
            reject("multiple_account_found");
          } else {
            resolve(false);
          }
        },
        queryObject,
        true
      );
    });
  };

  private _createTokens = async (user: IUserInterface) => {
    const createToken = jwt.sign(
      {
        user: _.pick(user[0], ["_id"]),
      },
      process.env.CLINT_SECRATE_KEY_1,
      {
        expiresIn: "7d",
      }
    );

    const createReffreshToken = jwt.sign(
      {
        user: _.pick(user[0], ["_id"]),
      },
      process.env.CLINT_SECRATE_KEY_2,
      {
        expiresIn: "7d",
      }
    );

    return Promise.all([createToken, createReffreshToken]);
  };

  public storage = multer.diskStorage({
    destination: (req, file, cb) => {
      /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
      cb(null, './public');
    },
    filename: (req, file, cb) => {
      /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
      */
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  });

  public uploadMular = () => {
    const storage = this.storage
    return multer({ storage })
  };


}
