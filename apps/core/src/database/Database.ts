import mongoose from "mongoose";

/**
 * Класс, отвечающий за работу с базой данных (MongoDB через Mongoose).
 *
 * Создаётся один раз в index.ts и передаётся туда, где нужен доступ
 * к данным (socket-обработчики, сервисы). Вся работа с подключением
 * сосредоточена здесь — больше нигде в проекте mongoose.connect не вызывается.
 */
export class Database {
  private readonly uri: string;
  private readonly options?: object;


  constructor(uri: string, options?: object) {
    this.uri = uri;
    this.options = options;
  }

  async connect(): Promise<void> {
    await mongoose.connect(this.uri, this.options);
    console.log("MongoDB connected");
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }

  get isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }
}
