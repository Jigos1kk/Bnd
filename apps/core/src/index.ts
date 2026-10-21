import { env } from "./config/env.js";
import { Database } from "./database/Database.js";
import { SocketServer } from "./socket/SocketServer.js";

async function bootstrap(): Promise<void> {
  const db = new Database(env.dbUrl, env.dbOptions);
  await db.connect();

  const socketServer = new SocketServer(db);
  socketServer.start(env.port);
}

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
