import { createServer } from "node:http";
import { Server } from "socket.io";
import { registerHandlers } from "./handlers/index.js";
/**
 * Класс, отвечающий за работу с Socket.IO.
 *
 * Создаёт HTTP-сервер и Socket.IO-сервер, управляет подключениями
 * и регистрирует обработчики событий. Получает Database в конструкторе,
 * чтобы передавать доступ к данным обработчикам.
 */
export class SocketServer {
    io;
    httpServer;
    db;
    constructor(db, options) {
        this.db = db;
        this.httpServer = createServer();
        this.io = new Server(this.httpServer, {
            cors: { origin: "*" },
            ...options,
        });
    }
    start(port) {
        this.io.on("connection", (socket) => {
            console.log("Пользователь подключился:", socket.id);
            registerHandlers(this.io, socket, this.db);
        });
        this.httpServer.listen(port, () => {
            console.log(`Server started! ${port}`);
        });
    }
    close() {
        this.io.close();
        this.httpServer.close();
    }
}
//# sourceMappingURL=SocketServer.js.map