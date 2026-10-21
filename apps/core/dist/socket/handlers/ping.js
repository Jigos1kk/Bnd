import { SocketEvents } from "../events.js";
export function registerPingHandler(socket) {
    socket.on(SocketEvents.PING, () => {
        socket.emit(SocketEvents.PONG, "Ping Pong!");
    });
}
//# sourceMappingURL=ping.js.map