import { bot } from "./config.js";
import { getRandomQuote } from "../database/get-random-quote.js";
import {MAX_MESSAGE_TIME, MIN_MESSAGE_TIME} from "../environment.js";
let timer: number;
function getHoursToWait() {
    const maximum = MAX_MESSAGE_TIME;
    const minimum = MIN_MESSAGE_TIME;
    const hours = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;;
    return hours * 60 * 60 * 1000
}
function setupTimer(callback: Function) {
    const timeToWait = getHoursToWait();
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, timeToWait);
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