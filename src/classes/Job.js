class JobImp {

    constructor(type='task', text=null, prio=null , deadLine=null , id,day=null ,user=null ,perpetual=null ) {
        this.type = type;
        this.text = text;
        this.prio = prio;
        this.deadLine = deadLine;
        this.id = id;
        this.day = day;
        this.user=user;
        this.perpetual = perpetual;
    }


    jobRequest() {
        return{
            type:this.type,
            text:this.text,
            prio:this.prio,
            deadLine:this.deadLine,
            day:this.day,
            perpetual:this.perpetual
        }
    }
}

export default JobImp;