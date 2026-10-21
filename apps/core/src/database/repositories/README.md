# repositories

Слой доступа к данным поверх моделей. Изолирует запросы к БД от бизнес-логики.

Пример: `userRepository.ts`

```ts
import { User } from "../models/User.js";

export const userRepository = {
  findById: (id: string) => User.findById(id),
  create: (data: unknown) => User.create(data),
};
```

Обработчики сокетов и сервисы вызывают репозитории, а не модели напрямую.
