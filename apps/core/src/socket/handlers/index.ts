import type { Server, Socket } from "socket.io";
import type { Database } from "../../database/Database.js";
import { registerPingHandler } from "./ping.js";
import { identityDeviceHandler } from "./identityDevice.js";

/** Регистрирует все обработчики событий для конкретного подключения. */
export function registerHandlers(io: Server, socket: Socket, db: Database): void {
  registerPingHandler(socket);
  identityDeviceHandler(socket)
}
