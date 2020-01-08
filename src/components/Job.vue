<template>
    <div id="Job">
        <div class="text-left m-0 p-0">
            <div class="job-text"><h4 class="p-0 m-0">{{job.text}}</h4></div>
        </div>
        <div class="btn-group-sm text-left" role="group">
            <button v-if="job.prio" type="button" v-bind:style="{color:getPrioColor}"
                    class="btn btn-sm btn-custom pl-0">Prio: {{job.prio}}
            </button>
            <button v-if="date" type="button" v-bind:style="{color:getDeadLineColor}" class="btn btn-sm btn-custom">Dead
                Line: {{date}}
            </button>
            <button type="button" id="removeBtn" @click="removeJob(job)"
                    class="btn btn-sm btn-custom p-0">
                <font-awesome-icon icon="times"/>
            </button>
            <button type="button" id="editBtn" @click="showModal=true"
                    class="btn btn-sm btn-custom p-0">
                <font-awesome-icon icon="pen-square"/>
            </button>
        </div>
        <modal v-if="showModal" @edit="editJob(job)" v-bind:job="job" @close="showModal=false"></modal>
    </div>
</template>

<script>
    import JobImp from "../classes/Job";
    import Modal from "./Modal";

    export default {
        name: "Job",
        methods: {
            editJob: function (job) {
                this.showModal = false;
                this.$emit('edit', job);
            },
            removeJob: function(job) {
                this.$emit('remove',job);
            }
        },
        components: {
            Modal
        },
        props: {
            job: JobImp
        },
        data: () => {
            return {
                showModal: false,
            }
        },
        computed: {
            date: function () {
                //TODO more generic solution needed maybe in node
                if (this.job.deadLine) {
                    let date = this.job.deadLine.split('T');
                    return date[0].replace(/-/g, '/');
                }
                return this.job.deadLine;
            },
            getPrioColor: function () {
                const prio = this.job.prio;
                if(prio<5) return 'green';
                else if(prio>=5 && prio<=10) return 'orange';
                return 'red';
            },
            getDeadLineColor: function () {
                const now = new Date();
                const date = this.job.deadLine.split('T');
                const deadLine = new Date(date[0]);
                const diff = Math.round((now.getTime() - deadLine.getTime()) / -100000000);
                if (diff < 5) return 'red';
                else if (diff >= 5 && diff < 10) return 'orange';
                return 'green';
            }
        }
    }
</script>

<style scoped>

    #Job {
        padding-top: .5em;
    }

    #editBtn, #removeBtn {
        font-size: 18px;
        margin-left: 5px;
    }

    #removeBtn {
        color: #af2896;
    }

    #editBtn {
        color: #509bf5;
    }
</style>