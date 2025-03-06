import TelegramBotAPI from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from "../environment";

const bot = new TelegramBotAPI(TELEGRAM_BOT_TOKEN, { polling: true });

export { bot };

