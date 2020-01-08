import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {DataStoredInToken} from "../jwt/DataStoredInToken.interface";
import HttpException from "../exceptions/HttpException";
import {RequestWithUsername} from "../jwt/RequestWithUser";

async function authMiddleware(request:RequestWithUsername,response:express.Response,next:express.NextFunction) {
    let token = request.headers.authorization.split(' ')[1];
    if(token) {
        const secret = process.env.JWT_SECRET;
        try {
            const verifiedResponse = jwt.verify(token,secret) as DataStoredInToken;
            request.user=verifiedResponse;
            next();
        }
        catch (e) {
            next(new HttpException(401,"Problem with token occurred"));
        }
    }
    else {
        next(new HttpException(401,"Missing authorization token"));
    }
}
export {authMiddleware};