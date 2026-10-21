import mongoose from "mongoose";
/**
 * Класс, отвечающий за работу с базой данных (MongoDB через Mongoose).
 *
 * Создаётся один раз в index.ts и передаётся туда, где нужен доступ
 * к данным (socket-обработчики, сервисы). Вся работа с подключением
 * сосредоточена здесь — больше нигде в проекте mongoose.connect не вызывается.
 */
export class Database {
    uri;
    constructor(uri) {
        this.uri = uri;
    }
    async connect() {
        await mongoose.connect(this.uri);
        console.log("MongoDB connected");
    }
    async disconnect() {
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
    }
    get isConnected() {
        return mongoose.connection.readyState === 1;
    }
}
//# sourceMappingURL=Database.js.map