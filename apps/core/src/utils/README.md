# utils

Вспомогательные утилиты без бизнес-логики: логгер, форматирование, хелперы.

Пример: `logger.ts`

```ts
export const logger = {
  info: (msg: string) => console.log(`[INFO] ${msg}`),
  error: (msg: string) => console.error(`[ERROR] ${msg}`),
};
```
