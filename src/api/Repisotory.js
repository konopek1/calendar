import axios from "axios";

const URL = "https://kiss-calendar.herokuapp.com/";

export default axios.create({
    baseURL: URL
});