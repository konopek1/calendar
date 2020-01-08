import * as express from 'express';
import {getRepository} from "typeorm";
import JobEntity from "./job.entity";
import HttpException from "../exceptions/HttpException";
import {authMiddleware} from "../middlewares/auth.middleware";
import {getAllDaysFormatter, validatePermissionForUser, addForPerpetual,templateResponseWrapper} from "./jobService";
import {RequestWithUsername} from "../jwt/RequestWithUser";
import JobRequest from './models/jobRequest';
import { TemplateResponse } from '../utils/TemplateResponse';

class JobController {
    public path = '/job';
    private router = express.Router();
    private jobRepository = getRepository(JobEntity);

    constructor() {
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private initializeMiddleware() {
        this.router.use(this.path,authMiddleware);
    }

    private initializeRoutes() {
        this.router.post(this.path, this.add);
        this.router.put(this.path, this.edit);
        this.router.delete(`${this.path}/:id`, this.remove);
        this.router.get(this.path,this.get);
    }

    private add = async (request: RequestWithUsername, response: express.Response, next: express.NextFunction) => {
        //todo implement validation and some architecutre with interfaces
        request.body.user = request.user._id;
        const recived: JobRequest = request.body;
        console.log(recived);                      
        let result:TemplateResponse;
        
        if(recived.perpetual.length === 0){
            const job = await this.jobRepository.create(recived);
            const resultSaving = await this.jobRepository.save(job);
            result = templateResponseWrapper(resultSaving);
        } else {
            result = addForPerpetual(this,recived);
        }

        if (result) {
            response.send(result);
        } else {
            next(new HttpException(404, `Could not add this job.`));
        }
    };

    private edit = async (request: RequestWithUsername, response: express.Response, next: express.NextFunction) => {
        const userId:number = request.user._id;
        request.body.user = userId;
        const jobUserDb = await this.jobRepository.findOne(request.body.id,{loadRelationIds:true});

        validatePermissionForUser(userId,jobUserDb.user,next);

        const job = await this.jobRepository.create(request.body);
        const resultSaving = await this.jobRepository.save(job);
        const result = templateResponseWrapper(resultSaving);

        if (result) {
            response.send(result);
        } else {
            next(new HttpException(404, `Could not edit this job id:${request.body.id}.`));
        }
    };

    private remove = async (request: RequestWithUsername, response: express.Response, next: express.NextFunction) => {
        const userId:number = request.user._id;
        request.body.user = userId;
        const jobUserDb = await this.jobRepository.findOne(request.params.id,{loadRelationIds:true});

        validatePermissionForUser(userId,jobUserDb.user,next);

        const resultDelete = await this.jobRepository.delete(request.params.id);
        const result = templateResponseWrapper(resultDelete);

        if (result) {
            response.send(result);
        } else {
            next(new HttpException(404, `Could not remove this job id:${request.params.id}`));
        }
    }

    private get = async (request:RequestWithUsername, response:express.Response, next: express.NextFunction) => {
        const userJobs:JobEntity[] = await this.jobRepository.find({where:{user:{id:request.user._id}}});
        const numberOfDays:number = Number(request.query.numberOfDays);
        const result = getAllDaysFormatter(userJobs, numberOfDays);
        
        if (result) {
            response.send(result);
        }
        else {
            next(new HttpException(404,"Could not get jobs for this user" + request.user._id));
        }
    }

}

export default JobController;