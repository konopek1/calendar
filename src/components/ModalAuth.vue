<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div class="modal-header">
                    <h4>
                        {{authType}}
                    </h4>
                </div>

                <div class="modal-body justify-content-center flex-nowrap">
                    <div class="group mt-4">
                        <input type="text" v-model="username" required>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Login</label>
                    </div>
                    <div class="group mt-4">
                        <input type="password" v-model="password" required>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Password</label>
                    </div>
                </div>

                <div class="modal-footer justify-content-start">
                    <button class="btn-sm btn-primary" @click="auth()">
                        {{authType}}
                    </button>
                    <button class="btn-sm btn-primary" @click="$emit('close')">
                        close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import authRepo from "../api/authRepo";

    export default {
        name: "ModalAuth",
        data: function () {
            return {
                username: "",
                password: ""
            }
        },
        props: {
            authType: String
        },
        methods: {
            auth() {
                if (this.authType === 'login') {
                    authRepo.login({username: this.username, password: this.password})
                        .then((response) => {
                            localStorage.setItem('token',response.data);
                            this.$emit('close');
                            this.flash('Logged in :)','success');
                        })
                        .catch((error)=>{
                            this.flash('Wrong credentials :(','error');
                        });
                } else {
                    authRepo.registerUser({username: this.username, password: this.password})
                        .then((response) => {
                            localStorage.setItem('token',response.data);
                            this.$emit('close');
                            this.flash('Registered :)','success');
                        })
                        .catch((error)=>{
                            this.flash('Wrong credentials :(','error');
                        });
                }
            }
        }
    }

</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .btn-primary {
        background-color: #1DB954 !important;
        border-color: #1DB954 !important;
    }

    .modal-header {
        color: #1DB954;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 90%;
        margin: 0 auto;
        background-color: rgba(255, 255, 255, .95);
        border-radius: 2px;
        color: black;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
    }


    input {
        font-size: 18px;
        padding: 10px 10px 10px 0;
        display: block;
        width: 100%;
        border: none;
        border-bottom: 1px solid #757575;
    }

    .group {
        position: relative;
        width: 100%;
    }

    input:focus {
        outline: none;
    }

    /* LABEL ======================================= */
    label {
        color: #999;
        font-size: 18px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 10px;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
    }

    /* active state */
    input:focus ~ label, input:valid ~ label {
        top: -20px;
        font-size: 14px;
        color: #5264AE;
    }

    /* BOTTOM BARS ================================= */
    .bar {
        position: relative;
        display: block;
        width: 90%;
    }

    .bar:before, .bar:after {
        content: '';
        height: 2px;
        width: 0;
        bottom: 1px;
        position: absolute;
        background: #5264AE;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
    }

    .bar:before {
        left: 50%;
    }

    .bar:after {
        right: 50%;
    }

    /* active state */
    input:focus ~ .bar:before, input:focus ~ .bar:after {
        width: 50%;
    }

    /* HIGHLIGHTER ================================== */
    .highlight {
        position: absolute;
        height: 60%;
        width: 50%;
        top: 25%;
        left: 0;
        pointer-events: none;
        opacity: 0.5;
    }

    /* active state */
    input:focus ~ .highlight {
        -webkit-animation: inputHighlighter 0.3s ease;
        -moz-animation: inputHighlighter 0.3s ease;
        animation: inputHighlighter 0.3s ease;
    }

    /* ANIMATIONS ================ */
    @-webkit-keyframes inputHighlighter {
        from {
            background: #5264AE;
        }
        to {
            width: 0;
            background: transparent;
        }
    }


</style>