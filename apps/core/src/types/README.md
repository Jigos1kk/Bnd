# types

Общие типы и интерфейсы, которые используются в нескольких местах проекта
(например типы payload'ов событий, DTO).

Пример: `message.ts`

```ts
export interface MessagePayload {
  roomId: string;
  text: string;
}
```
