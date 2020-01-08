import JobEntity from "./job.entity";
import {JobResponse} from "./models/jobResponse";
import JobDto from "./models/jobDto";
import {NextFunction} from 'express';
import HttpException from "../exceptions/HttpException";
import JobRequest from "./models/jobRequest";
import { Result } from "../utils/Codes";
import { TemplateResponse } from "../utils/TemplateResponse";

function getAllDaysFormatter(jobs: JobEntity[],numberOfDays:number):JobResponse[] {
    const nextDay = (previous) => {
        const year = previous.getFullYear();
        const month = previous.getMonth();
        const day = previous.getDate();
        return new Date(year , month, day + 1)
    };

    let result: JobResponse[]=[];
    let day =new Date();
    let jobsPerDay:JobDto[]=[];

    for (let i = 0; i<numberOfDays; i++) {
        day = nextDay(day);
        jobs.forEach((job)=>{
            if(day.valueOf() == job.day.valueOf()) {
                jobsPerDay.push(job);
            }
        });
        result.push(new JobResponse(day,jobsPerDay));
        jobsPerDay = [];
    }
    return result;
}

function validatePermissionForUser(requestUserId:number,jobUserId:any,next:NextFunction) {
    if(requestUserId === jobUserId) {
        return;
    }
    else {
        return next(new HttpException(403,"You are not able to touch this job!"));
    }
}

function templateResponseWrapper(result:Object):TemplateResponse{
    if(result) {
        return new TemplateResponse(JSON.stringify(result),Result.POSITIVE);
    } else {
        return null;
    }
}

const addForPerpetual = (_this,recived:JobRequest):TemplateResponse => {
    try{
    const dayAHead:number = 400;
    const daysDict = ['nie','pon','wto','sro','czw','pia','sob'];

    const findNextNameDay = (recivedDay:Date,day:string)=>{
        const currDate = new Date(recivedDay);    
        const year = currDate.getFullYear();
        const month = currDate.getMonth();
        const dayNow = currDate.getDate();
        let days = currDate.getDay();
        let diff = days - daysDict.indexOf(day) -1 ;
        if (diff <0) diff = diff + 7;
        return new Date(year,month,dayNow +diff)
    }

    const nextWeek = (currDate:Date):Date => {
        const year = currDate.getFullYear();
        const month = currDate.getMonth();
        const day = currDate.getDate();
        return new Date(year , month, day + 7)
    }

    const loopForDayOfWeek = async (day:Date,recived:JobRequest) =>{
            let newDay:Date = day;

        for(let i =0; i< dayAHead/7; i++){
            recived.day = newDay;
            newDay = nextWeek(newDay);
            const job =  _this.jobRepository.create(recived)
            await _this.jobRepository.save(job)
            .catch(err=>console.error(err));
        }
    }

    recived.perpetual.forEach(day => {
        const startDay = findNextNameDay(recived.day,day);
        console.log("startDay: ",startDay);
        loopForDayOfWeek(startDay,recived);
    });
}
catch(e){
    console.error(e);
    return {body:"Error while adding perpetual days" ,code:Result.NEGATIVE};
}
    return {body:"Success adding  perpetual days" ,code:Result.POSITIVE};
}

export {getAllDaysFormatter,validatePermissionForUser,addForPerpetual,templateResponseWrapper};
