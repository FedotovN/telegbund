import { bot } from "./config.js";
import { getRandomQuote } from "../database/get-random-quote.js";

function getHoursToWait() {
    const maximum = 0.005;
    const minimum = 0.005;
    const hours = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;;
    return hours * 60 * 60 * 1000
}
function setupTimer(callback: Function) {
    const timeToWait = getHoursToWait();
    setTimeout(callback, timeToWait);
}

export function queueMessage(chatId: number) {
    setupTimer(async () => {
        const message = await getRandomQuote();
        const fallbackMessage = 'А спроси ка у Никиты... Что он думают о базах данных? Он думает о них? У него бывают навязчивые мысли...Что в этом мире есть какая нибудь пустая база данных?'
        const messageToSend = message || fallbackMessage
        await bot.sendMessage(chatId, messageToSend);
        queueMessage(chatId);
    })
}