import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

/** Единая типизированная точка чтения конфигурации приложения. */
export const env = {
  port: Number(process.env.PORT ?? 21024),
  dbUrl: required("DB_URL"),
  dbOptions: {
    user: String(process.env.DB_USER),
    pass: String(process.env.DB_PASS),
    authSource: String(process.env.DB_SOURCE)
  }
} as const;
