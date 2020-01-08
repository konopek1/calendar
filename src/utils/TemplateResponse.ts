import { Result } from "./Codes";

export class TemplateResponse {
    constructor(body,code) {
        this.body = body;
        this.code = code;
    }
    body: String
    code: Result
}