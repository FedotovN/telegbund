import { getAdminUser, getClientUser } from "../database/users.js";
import { HUSBAND_TELEGRAM_ID, WIFE_TELEGRAM_ID } from "../environment.js";
import { bot } from "./config.js";
import { queueMessage } from "./bot-timer.js";
import { config } from "./config.js";

export async function onBotStartup() {
    const adminUser = await getAdminUser(HUSBAND_TELEGRAM_ID);
    const clientUser = await getClientUser(WIFE_TELEGRAM_ID);

    if (adminUser) {
        const { chatId } = adminUser.dataValues;
        await bot.sendMessage(chatId, 'Бот успешно запущен.');
    }
    if (clientUser) {
        const { chatId } = clientUser.dataValues;
        await queueMessage(chatId);
    }

    config.adminUser = adminUser;
    config.clientUser = clientUser;

    console.log(`
        RoboFedotov checked for any existing users 🔎
        Admin User: ${adminUser?.dataValues.userId || 'No Admin User'}
        Client User: ${clientUser?.dataValues.userId || 'No Client User'}
    `)
}