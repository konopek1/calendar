import Repisotory from "./Repisotory";

const resources = '/job';

export default {
    editJob(payload) {
        return Repisotory.put(`${resources}`, payload,{headers:{Authorization: "Bearer " + localStorage.getItem('token')}});
    },
    removeJob(id) {
        return Repisotory.delete(`${resources}/${id}`,{headers:{Authorization: "Bearer " + localStorage.getItem('token')}});
    },
    addJob(payload) {
        return Repisotory.post(`${resources}`, payload,{headers:{Authorization: "Bearer " + localStorage.getItem('token')}});
    },
    getAllJobs(numberOfDays) {
        return Repisotory.get(resources+"?numberOfDays="+numberOfDays,{headers:{Authorization: "Bearer " + localStorage.getItem('token')}});
    }
}