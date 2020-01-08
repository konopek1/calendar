import JobDto from "./jobDto";

export class JobResponse {
    public day:Date;
    public jobs:JobDto[];

    constructor(day: Date, jobs: JobDto[]) {
        this.day = day;
        this.jobs = jobs;
    }
}