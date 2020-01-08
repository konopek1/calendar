import  * as express from 'express';
import {DataStoredInToken} from "./DataStoredInToken.interface";

export interface RequestWithUsername extends express.Request {
    user: DataStoredInToken;
}

