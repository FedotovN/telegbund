import dotenv from "dotenv";
import type EnvironmentVariables from "../types/environment.type.js";

const { error, parsed } = dotenv.config();

if (error) {
    console.error(error);
    process.exit(1);
}
const {
    TELEGRAM_BOT_TOKEN, WIFE_TELEGRAM_ID,
    DATABASE_PORT, DATABASE_HOST, DATABASE_PASSWORD,
    DATABASE_USERNAME, DATABASE_NAME
} = parsed as unknown as EnvironmentVariables;

export {
    TELEGRAM_BOT_TOKEN, WIFE_TELEGRAM_ID,
    DATABASE_PORT, DATABASE_HOST, DATABASE_PASSWORD,
    DATABASE_USERNAME, DATABASE_NAME
};