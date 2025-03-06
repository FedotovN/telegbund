import { bot } from "./config";

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
        const message = '♥️'
        await bot.sendMessage(chatId, message);
        queueMessage(chatId);
    })
}