
class userRequest {
    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    private readonly _username: string;

    private readonly _password: string;
} export default userRequest;