import Repisotory from "./Repisotory";

const resources = '/auth';

export default {
    login(payload) {
        localStorage.setItem('token','');
        return Repisotory.post(resources + "/login",payload);
    },
    registerUser(payload) {
        localStorage.setItem('token','');
        return Repisotory.post(resources + "/register",payload);
    }
}