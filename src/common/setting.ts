import { load } from "dotenv";
const envVars = await load();

class Setting {
  static readonly DATABASE_URL = envVars.DATABASE_URL;
}
export default Setting;
