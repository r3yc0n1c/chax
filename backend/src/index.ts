import express from 'express';
import helmet from 'helmet';
import xss from "xss-clean";
import rateLimit from 'express-rate-limit';
import cors from "cors";

import morganMiddleware from './config/morgan';
import SocketService from './services/socket.service';


const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    skipSuccessfulRequests: true,
});

const app = express();

app.use(cors())
    .use(xss())
    .use(helmet())
    .use(express.json())
    .use(authLimiter)
    .use(morganMiddleware)
    .use(express.urlencoded({ extended: true }));

// app.use("/v1", routes);

const expressServer = app.listen(5000, () => {
    console.log("listening on *:5000");
});

const socketService = new SocketService(expressServer, {
    cors: {
        origin: "*",
        allowedHeaders: ["*"]
    }
});

socketService.intiListeners();