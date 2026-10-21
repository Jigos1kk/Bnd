import { createServer, type Server as HttpServer } from "node:http";
import { Server, type ServerOptions } from "socket.io";
import type { Database } from "../database/Database.js";
import { registerHandlers } from "./handlers/index.js";

/**
 * Класс, отвечающий за работу с Socket.IO.
 *
 * Создаёт HTTP-сервер и Socket.IO-сервер, управляет подключениями
 * и регистрирует обработчики событий. Получает Database в конструкторе,
 * чтобы передавать доступ к данным обработчикам.
 */
export class SocketServer {
  readonly io: Server;
  private readonly httpServer: HttpServer;
  private readonly db: Database;

  constructor(db: Database, options?: Partial<ServerOptions>) {
    this.db = db;
    this.httpServer = createServer();
    this.io = new Server(this.httpServer, {
      cors: { origin: "*" },
      ...options,
    });
  }

  start(port: number): void {
    this.io.on("connection", (socket) => {
      console.log("Пользователь подключился:", socket.id);
      registerHandlers(this.io, socket, this.db);
    });

    this.httpServer.listen(port, () => {
      console.log(`Server started! ${port}`);
    });
  }

  close(): void {
    this.io.close();
    this.httpServer.close();
  }
}
