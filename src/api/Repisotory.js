import axios from "axios";

const URL = "https://intense-temple-86488.herokuapp.com";

export default axios.create({
    baseURL: URL
});