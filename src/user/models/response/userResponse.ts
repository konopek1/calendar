class userResponse {
    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    private _username: string;
    private _password: string;
}