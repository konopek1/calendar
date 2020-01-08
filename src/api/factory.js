import jobRepo from "./jobRepo";
import authRepo from "./authRepo";

const repos = {
    job: jobRepo,
    auth: authRepo
};

export const RepoFactory = {
    get: name => repos[name]
};