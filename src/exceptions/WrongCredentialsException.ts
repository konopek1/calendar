import HttpException from "./HttpException";

class WrongCredentialsException extends HttpException{
    private User:string;
    constructor() {
        super(403,"Your login or password is wrong");
    }
}export default WrongCredentialsException;