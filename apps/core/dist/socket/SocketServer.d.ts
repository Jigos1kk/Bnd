import { Server, type ServerOptions } from "socket.io";
import type { Database } from "../database/Database.js";
/**
 * Класс, отвечающий за работу с Socket.IO.
 *
 * Создаёт HTTP-сервер и Socket.IO-сервер, управляет подключениями
 * и регистрирует обработчики событий. Получает Database в конструкторе,
 * чтобы передавать доступ к данным обработчикам.
 */
export declare class SocketServer {
    readonly io: Server;
    private readonly httpServer;
    private readonly db;
    constructor(db: Database, options?: Partial<ServerOptions>);
    start(port: number): void;
    close(): void;
}
