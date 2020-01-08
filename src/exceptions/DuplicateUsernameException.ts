import HttpException from "./HttpException";

class DuplicateUsernameException extends HttpException {
    constructor(username: string) {
        super(403, `User with ${username} already exists.`);
    }
}

export default DuplicateUsernameException;