import express from 'express';
import helmet from 'helmet';
import xss from "xss-clean";
import rateLimit from 'express-rate-limit';
import cors from "cors";

import morganMiddleware from './config/morgan';
import SocketService from './services/socket.service';
import routes from './routes';
import redisClient from './config/redis';


// api rate limitter configuration
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    skipSuccessfulRequests: true,
});

// CORS configs
const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
};

// init Express app
const app = express();

// configure express app
app.use(cors(corsConfig))
    .use(xss())
    .use(helmet())
    .use(express.json())
    .use(authLimiter)
    .use(morganMiddleware)
    .use(express.urlencoded({ extended: true }));

// add all the endpoints
app.use("/", routes);

redisClient.connect();

// start express server
const expressServer = app.listen(5000, () => {
    console.log("listening on *:5000");
});

// start socket server
const socketService = new SocketService(expressServer, {
    cors: {
        origin: "*",
        allowedHeaders: ["*"]
    }
});

// init all socket listeners
socketService.intiListeners();