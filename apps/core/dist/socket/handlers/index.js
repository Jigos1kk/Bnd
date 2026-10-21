import { registerPingHandler } from "./ping.js";
/** Регистрирует все обработчики событий для конкретного подключения. */
export function registerHandlers(io, socket, db) {
    registerPingHandler(socket);
}
//# sourceMappingURL=index.js.map