import { load } from "dotenv";
const envVars = await load();

export class Setting {
  static readonly DB = {
    NAME: envVars.DATABASE_DBNAME,
    USER: envVars.DATABASE_USER,
    PASSWORD: envVars.DATABASE_PASSWORD,
    HOST: envVars.DATABASE_HOST,
    PORT: envVars.DATABASE_PORT,
  }
  static readonly Zenn = {
    USER_NAME: envVars.ZENN_USER_NAME,
  }
}
