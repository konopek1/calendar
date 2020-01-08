import HttpException from "../exceptions/HttpException";
import {NextFunction, Request, Response} from 'express';

function errorHandlerMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status;
    const message = error.message;
    response
        .status(status)
        .send({
            status,
            message
        })

}

export default errorHandlerMiddleware;