import type { Socket } from "socket.io";
import { SocketEvents } from "../events.js";

export function registerPingHandler(socket: Socket): void {
  socket.on(SocketEvents.PING, () => {
    socket.emit(SocketEvents.PONG, "Ping Pong!");
  });
}
