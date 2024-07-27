import type { Server as HttpServer } from "http";
import { Server, type ServerOptions } from "socket.io";
import logger from "../config/logger";

class SocketService {
    private _io: Server;

    constructor(server: HttpServer, options = {}) {
        logger.info("New socket service created")

        this._io = new Server(server, options);
    }

    get io() {
        return this._io;
    }

    public intiListeners() {
        logger.info(`Init listeners`);

        this.io.on("connection", (socket) => {

            logger.info(`New socket connected with id: ${socket.id}`)

            socket.on('message', (message: string) => {
                logger.info(message);
            })
        })
    }
}

export default SocketService;