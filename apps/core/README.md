# BND Core

Серверное ядро проекта: работа с базой данных (MongoDB) и обмен данными в реальном времени (Socket.IO).

## Стек

- Node.js + TypeScript (ESM, `module: nodenext`)
- Socket.IO — двусторонний обмен данными в реальном времени
- Mongoose — ODM для MongoDB
- dotenv — конфигурация через переменные окружения

## Структура

```
src/
├── config/        # конфигурация и переменные окружения
├── database/      # подключение к БД, модели, репозитории
├── socket/        # Socket.IO: сервер, обработчики, middleware
├── services/      # бизнес-логика
├── types/         # общие типы
└── utils/         # вспомогательные утилиты
```

Подробнее о каждой папке — в её `README.md`.

## Запуск

```bash
npm install
npm run dev     # tsx watch src/index.ts
npm run build   # tsc
npm run start   # node dist/index.js
```

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните значения:

- `PORT` — порт HTTP-сервера (по умолчанию `21024`)
- `DB_URL` — строка подключения к MongoDB
