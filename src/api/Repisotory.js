import axios from "axios";

const URL = "http://localhost:9090";

export default axios.create({
    baseURL: URL
});