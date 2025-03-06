import dotenv from "dotenv";
import type EnvironmentVariables from "../types/environment.type";

const { error, parsed } = dotenv.config();

if (error) {
    console.log(error);
    process.exit(1);
}
const { TELEGRAM_BOT_TOKEN, WIFE_TELEGRAM_ID } = parsed as unknown as EnvironmentVariables;
export { TELEGRAM_BOT_TOKEN, WIFE_TELEGRAM_ID };