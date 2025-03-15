import { bot } from "./config.js";
import { getRandomQuote } from "../database/get-random-quote.js";
import { MAX_MESSAGE_TIME, MIN_MESSAGE_TIME } from "../environment.js";
import { config } from "./config.js";

let timer: number;

function getHoursToWait() {
    const maximum = Number(MAX_MESSAGE_TIME);
    const minimum = Number(MIN_MESSAGE_TIME);
    const hours = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return hours * 60 * 60 * 1000
}
async function setupTimer(callback: Function) {
    const timeToWait = getHoursToWait();
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, timeToWait);

    await logScheduleToAdmin(timeToWait);
}

async function logScheduleToAdmin(timeToWait: number) {
    console.log('Next message will be send in', timeToWait / 60 / 60 / 1000);
    if (!config.adminUser) return;
    const { chatId } = config.adminUser.dataValues;
    await bot.sendMessage(chatId, `Следующее сообщение будет отправлено через ${timeToWait / 60 / 60 / 1000} часов.`);
}
async function logMessageToAdmin(message: string) {
    console.log('Message sent', message);
    if (!config.adminUser) return;
    const { chatId } = config.adminUser.dataValues;
    await bot.sendMessage(chatId, `Сообщение отправлено: ${message}`);
}

export async function queueMessage(chatId: number) {
    await setupTimer(async () => {
        const message = await getRandomQuote();
        const fallbackMessage = 'Мне никогда не важна погода за окном потому что ты моё солнышко даришь мне передоз витамина Д'
        const messageToSend = message || fallbackMessage
        await bot.sendMessage(chatId, messageToSend);
        await logMessageToAdmin(messageToSend);
        await queueMessage(chatId);
    })
}