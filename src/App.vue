<template>
    <div id="app" class="container-fluid align-items-center text-center w-100">
        <ModalAuth v-if="showAuthModal" @close="authenticate()" v-bind:authType="authType"></ModalAuth>
        <div class="auth text-right row w-100 d-flex align-items-center justify-content-end">
        <flash-message class="alerts"></flash-message>
            <h4>
                <button class="button btn-sm btn-success" @click="fetchJobsWithNumber(7)">7</button>
                <button class="button btn-sm btn-success" @click="fetchJobsWithNumber(14)">14</button>
                <button class="button btn-sm btn-success" @click="fetchJobsWithNumber(30)">30</button>
                <button class="ml-2 btn-sm btn-success" @click="auth('login')">Log in</button>
                <button class="mr-2 button btn-sm btn-success" @click="auth('register')">Register</button>
        </h4></div>
        <div v-for="day in days">
            <Day @refresh="fetchDays()" v-bind:day="day"/>
        </div>

    </div>
</template>

<script>
    import Day from "./components/Day";
    import {RepoFactory} from "./api/factory";
    import ModalAuth from "./components/ModalAuth";
    require('vue-flash-message/dist/vue-flash-message.min.css');

    const repoJob = RepoFactory.get('job');

    export default {
        name: 'app',
        components: {
            Day,
            ModalAuth
        },
        data: () => {
            return {
                days: [],
                authType:String,
                showAuthModal:false,
                numberOfDays:14
            }
        },
        methods: {
            fetchDays() {
                repoJob.getAllJobs(this.numberOfDays)
                    .then((result)=>{this.days = result.data})
                    .catch((error)=> this.flash('Data didnt fetch :( cause:'+error,'error'));
            },
            auth(authType) {
                this.showAuthModal = true;
                this.authType = authType;
            },
            authenticate() {
                this.showAuthModal = false;
                this.fetchDays();
            },
            fetchJobsWithNumber(numberOfDays){
                this.numberOfDays = numberOfDays;
                this.fetchDays();
            }

        },
        created() {
            this.fetchDays();
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:400,600,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=ABeeZee:400,400i&display=swap');

    #app {
        font-family: 'ABeeZee', 'Arial';
        background-color: black;
        color: #ffffff;
        padding-top: 5%;
        min-height: 100vh;
    }
    .flash__message {
        position: fixed;
        bottom: 3px;
        left:5px;
    }

    .flash__message {
     padding:8px 57px 8px 36px; 
    }

    body {
        background-color: black;
    }

    .alerts {
        z-index: 9 !important;
    }


</style>
