import { Quote } from "../models/quote.model.js";
import { bot } from "../bot/config.js";

export async function addNewQuote(id: number, text?: string): Promise<void> {
    if (!text) {
        await bot.sendMessage(id, 'Сообщение не содержит текста. Оно не было добавлено в очередь');
        return;
    }
    try {
        await Quote.create({ text, isUsed: false});
        await bot.sendMessage(id, 'Сообщение успешно добавлено в очередь!')
    } catch (e) {
        await bot.sendMessage(id, 'Во время добавления сообщения произошла ошибка!');
    }
}