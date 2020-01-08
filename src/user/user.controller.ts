import * as express from 'express';
import * as bcrypt from 'bcrypt';
import {getRepository} from "typeorm";
import UserEntity from "./user.entity";
import DuplicateUsernameException from "../exceptions/DuplicateUsernameException";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import {createToken} from "../jwt/jwtImplementation";
import {TokenData} from "../jwt/tokenData.inteface";
import userRequest from "./models/request/userRequest";
import User from "./models/User";
import {validate} from "class-validator";

class UserController {
    public path = "/auth";
    private router = express.Router();
    private userRepository = getRepository(UserEntity);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path + "/login", this.login);
        this.router.post(this.path + "/register", this.register);
    }

    private register = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: userRequest = request.body;
        if (await this.userRepository.findOne({where: {username: userData.username}})) {
            next(new DuplicateUsernameException(userData.username));
        } else {
            const ePassword = await bcrypt.hash(userData.password, 10);
            const hashedUser = await this.userRepository.create({username: userData.username, password: ePassword});
            const user = await this.userRepository.save(hashedUser);
            const tokenData = createToken(user);
            response.send(UserController.createCookie(tokenData));
        }
    };

    private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        //todo valdiation email itp czy nie puste na wszystkich polach
        const userData: userRequest = request.body;
        const user = await this.userRepository.findOne({where:{username:userData.username}});

        if(user === undefined) {return next(new WrongCredentialsException())};

        const isPasswordMatching = await bcrypt.compare(userData.password,user.password);
        
        if(isPasswordMatching) {
            user.password = undefined;
            const tokenData = createToken(user);
            response.send(UserController.createCookie(tokenData));
        }
        else {
            next(new WrongCredentialsException());
        }
    };

    private static createCookie(tokenData: TokenData) {
        return `${tokenData.token} Max-Age=${tokenData.expiresIn}`;
    }
}

export default UserController;