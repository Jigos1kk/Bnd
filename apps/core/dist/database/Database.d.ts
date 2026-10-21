/**
 * Класс, отвечающий за работу с базой данных (MongoDB через Mongoose).
 *
 * Создаётся один раз в index.ts и передаётся туда, где нужен доступ
 * к данным (socket-обработчики, сервисы). Вся работа с подключением
 * сосредоточена здесь — больше нигде в проекте mongoose.connect не вызывается.
 */
export declare class Database {
    private readonly uri;
    constructor(uri: string);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    get isConnected(): boolean;
}
