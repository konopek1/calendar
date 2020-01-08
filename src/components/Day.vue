<template>
    <div id="Day" class="dady">
        <h1>{{date}}</h1>
        <ul>
            <Job v-for="job in day.jobs" v-bind:key="job.id" v-bind:job="JobDataTransform(job)" @remove="removeJob(job)" @edit="editJob" @add="addJob(job)" />
        </ul>
        <button type="button" id="addBtn" @click="showModal=true" class="btn btn-sm btn-custom p-0">
            <font-awesome-icon icon="plus-square"/>
        </button>
        <ModalAdd v-if="showModal" @add="addJob(emptyJob)" @close="showModal=false" v-bind:crud-operation="'add'"
                  v-bind:job="emptyJob"></ModalAdd>
        <hr>
    </div>
</template>

<script>
    import Job from "./Job";
    import JobImp from "../classes/Job";
    import ModalAdd from "./ModalAdd";
    import {RepoFactory} from "../api/factory";
    import {numberToDate} from "../common/helpfuls";

    export default {
        name: 'Day',
        methods: {
            removeJob: function (job) {
                const index = this.day.jobs.indexOf(job);
                this.day.jobs.splice(index, 1);
                this.repo.removeJob(job.id)
                    .then(()=>{
                            this.$emit('refresh');
                            this.flash('Removed :)','success');
                        })
                    .catch((error)=>{
                        this.flash('Wasnt able to remove:'+error,'error');    
                    });
                
            },
            addJob: function (job) {
                this.showModal = false;
                job.day = this.day.day;
                this.repo.addJob(job)
                    .then( ()=>{
                        this.$emit('refresh');
                        this.flash('Added :)','success'); 
                        }) 
                    .catch((error)=>{
                        this.flash('Wasnt able to add:'+error,'error');    
                    });
            },
            editJob: function (_job) {
                _job.day = this.day.day;
                this.repo.editJob(new JobImp(_job.type, _job.text, _job.prio, _job.deadLine, _job.id,_job.day))
                    .then(()=>{
                        this.$emit('refresh');
                        this.flash('Edited :)','success');
                    })
                    .catch((error)=>{
                        this.flash('Wasnt able to edit:'+error,'error');    
                    });
            },
            JobDataTransform: function (job) {
                return new JobImp(job.type, job.text, job.prio, job.deadLine, job.id);
            }
        },
        computed: {
            date: function () {
                let date = this.day.day.split('T');
                date = date[0].split('-').splice(1, 2);
                date = date.join('/');
                const dayName = new Date(this.day.day.split('T')[0]).getDay();
                return numberToDate(dayName) + " " + date;
            }
        },
        props: {
            day: Object
        },
        components: {
            Job,
            ModalAdd
        },
        data: function () {
            return {
                showModal: false,
                emptyJob: new JobImp(),
                repo: RepoFactory.get('job')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #Day {
        margin-top: 2vh;
    }
    h1 {
        font-family: 'Source Code Pro', 'Arial';
    }
    ol{
        font-size: 20px;
    }
    hr {
        height: 4px;
        background: rgb(64, 64, 64);
        border-radius: 5px;
    }

    #addBtn {
        font-size: 24px;
        color: rgba(255, 255, 255, 0.85);
    }
</style>
