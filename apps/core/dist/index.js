import { env } from "./config/env.js";
import { Database } from "./database/Database.js";
import { SocketServer } from "./socket/SocketServer.js";
async function bootstrap() {
    const db = new Database(env.dbUrl);
    await db.connect();
    const socketServer = new SocketServer(db);
    socketServer.start(env.port);
}
bootstrap().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map