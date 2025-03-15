import TelegramBotAPI from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from "../environment.js";
import { Model } from "sequelize";

const bot = new TelegramBotAPI(TELEGRAM_BOT_TOKEN, { polling: true });

const config = {
    adminUser: null,
    clientUser: null,
} as { adminUser: Model | null;  clientUser: Model | null; }

export { bot, config };

