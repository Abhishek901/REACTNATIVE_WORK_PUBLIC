import jwt from 'jsonwebtoken';
import _ from 'lodash';
import {IUserInterface} from '../../models/Interfaces/user.interface';

export const createTokens =  async (user:IUserInterface,secret:jwt.Secret,secret2:jwt.Secret) =>{
   
    const createToken = jwt.sign(
        {
            user:_.pick(user,['_id','role']),
        },
        secret,
        {
            expiresIn:'1m'
        }
    );
    
    const createReffreshToken = jwt.sign(
        {
           user:_.pick(user,['_id']), 
        },
        secret2,
        {
            expiresIn:'7d'
        }
    );
    
    return Promise.all([createToken,createReffreshToken]);

}