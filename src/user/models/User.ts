class User {
    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    get id(): number {
        return this._id
    }

    private _username: string;
    private _password: string;
    private _id:number;
}export default User;