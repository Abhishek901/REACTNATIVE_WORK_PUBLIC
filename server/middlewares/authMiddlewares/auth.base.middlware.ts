import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as jwt from "jsonwebtoken";
const AuthMiddleware = {
    base: (req: Request, res: Response, next: NextFunction) => {
        if (Boolean(req.headers.authorization)) {
            const token = req.headers.authorization;
            const tokenArray = token.split(' ');
            const accsessToken = tokenArray[1]
            jwt.verify(accsessToken, process.env.CLINT_SECRATE_KEY_1, function (err, decodedToken) {
                if (err) {
                    console.log(err)
                    res.status(500).send({ message: 'Not validated' })
                    res.end()
                }
                else {
                    
                    const userObj = decodedToken;
                    const lastBody = req.body;
                    req.body = Object.assign(lastBody, {
                        user: userObj
                    })


                    next()
                }
            });

        } else {
            res.status(401).send({ message: 'Unauthorised' })
            res.end()
        }

    }
}
export default AuthMiddleware;