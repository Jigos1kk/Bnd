# middleware

Промежуточные функции Socket.IO (`io.use(...)`): аутентификация, валидация, ограничение частоты запросов.

Пример: `auth.ts`

```ts
import type { Socket } from "socket.io";

export function auth(socket: Socket, next: (err?: Error) => void): void {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("Unauthorized"));
  next();
}
```

Подключается в `SocketServer` через `io.use(...)`.
