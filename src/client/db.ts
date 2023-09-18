import { Client } from "pg";
import { Setting } from "../common/setting.ts";

export const client = new Client({
  database: Setting.DB.NAME,
  user: Setting.DB.USER,
  password: Setting.DB.PASSWORD,
  hostname: Setting.DB.HOST,
  port: Setting.DB.PORT,
});
