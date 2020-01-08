import {IsEmail, Length} from "class-validator";

class UserValidate {
    @IsEmail()
    public username:string;

    @Length(10, 20)
    public password:string;
}