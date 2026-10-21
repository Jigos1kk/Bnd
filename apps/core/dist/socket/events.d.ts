/** Константы имён событий — единый источник правды для сервера и клиента. */
export declare const SocketEvents: {
    readonly PING: "ping";
    readonly PONG: "pong";
};
export type SocketEvent = (typeof SocketEvents)[keyof typeof SocketEvents];
