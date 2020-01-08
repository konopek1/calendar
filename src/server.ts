import 'reflect-metadata';
import {createConnection} from 'typeorm';
import 'dotenv/config';
import App from "./App";
import validateEnv from './utils/validateEnv';
import config from "../ormconfig";
import JobController from "./job/job.controller";
import UserController from "./user/user.controller";


validateEnv();

(async () => {
    try {
        await createConnection(config);
    } catch (error) {
        console.log('Error while connecting to the database', error);
        return error;
    }
    const app = new App(
        [
            new UserController(),
            new JobController()
        ],
    );
})();
