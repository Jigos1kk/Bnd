/** Константы имён событий — единый источник правды для сервера и клиента. */
export const SocketEvents = {
  PING: "ping",
  PONG: "pong",
  IDENTITY_DEVICE: "identity_device",
} as const;

export type SocketEvent = (typeof SocketEvents)[keyof typeof SocketEvents];
