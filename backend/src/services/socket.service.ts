import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { Redis } from "ioredis";
import logger from "../config/logger";
import config from "../config/config";

const pub = new Redis(config.redis);
const sub = new Redis(config.redis);

pub.on("error", err => {
    console.log('Redis conn. error', err)
    process.exit(1);
})

class SocketService {
    private _io: Server;

    constructor(server: HttpServer, options = {}) {
        logger.info("New socket service created")

        this._io = new Server(server, options);

        // Subscribe to MESSAGES channel 
        sub.subscribe("MESSAGES");
    }

    get io() {
        return this._io;
    }

    public intiListeners() {
        logger.info("Init listeners");

        const io = this.io;

        io.on("connection", (socket) => {
            logger.info(`New socket connected with id: ${socket.id}`)

            socket.on('message', async (message: string) => {
                logger.info(`new msg: ${message}`);
                await pub.publish("MESSAGES", JSON.stringify({ message }))
            })
        })

        sub.on('message', (channel, message) => {
            if (channel === "MESSAGES") {
                io.emit('message', message);
            }
        })
    }
}

export default SocketService;