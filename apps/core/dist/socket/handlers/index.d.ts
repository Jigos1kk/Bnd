import type { Server, Socket } from "socket.io";
import type { Database } from "../../database/Database.js";
/** Регистрирует все обработчики событий для конкретного подключения. */
export declare function registerHandlers(io: Server, socket: Socket, db: Database): void;
