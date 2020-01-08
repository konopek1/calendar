import {DataStoredInToken} from "./DataStoredInToken.interface";
import * as jwt from 'jsonwebtoken';
import UserEntity from "../user/user.entity";

function createToken(user:UserEntity) {
    const expiresIn =   24 * 3600;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken:DataStoredInToken = {
        _id:user.id,
        _username:user.username
    };
    return {
        expiresIn:expiresIn,
        token:jwt.sign(dataStoredInToken,secret,{expiresIn:expiresIn})
    }
}

export {createToken};