import * as express from 'express';
import * as bodyParser from 'body-parser';
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";
import * as cookieParser from 'cookie-parser';
const cors = require('cors');

class App {
    public app: express.Application;

    constructor(controllers, port: number = Number(process.env.PORT || 9090)) {
        this.app = express();

        this.initMiddleware();
        this.initController(controllers);
        this.initErrorHandlers();
        this.listen(port);
    }

    private initMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(cookieParser());
    }

    private initErrorHandlers() {
        this.app.use(errorHandlerMiddleware);
    }

    private initController(controllers) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    private listen(port: number) {
        this.app.listen(port, () => {
            console.log(`Server started at port: ${port}`)
        })
    }
}

export default App;
