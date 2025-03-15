import { bot } from "../../bot/config.js";
import { queueMessage } from "../../bot/bot-timer.js";

export async function handleInitialMessage(chatId: number): Promise<void> {
    await bot.sendMessage(chatId, 'ROBOFEDOTOV v1.0.0 ПРИСТУПАЕТ К ВЫПОЛНЕНИЮ ОБЯЗАННОСТЕЙ\nПодготовка протокола "Улыбка Богини..."');
    await bot.sendMessage(chatId, 'Ожидайте спонтанных приятностей.');

    await queueMessage(chatId);
}
export async function handleInitialAdminMessage(chatId: number): Promise<void> {
    await bot.sendMessage(chatId, 'ROBOFEDOTOV v1.0.0 ПРИСТУПАЕТ К ВЫПОЛНЕНИЮ ОБЯЗАННОСТЕЙ\nПодготовка протокола "Улыбка Богини..."');
    await bot.sendMessage(chatId, 'Введите сообщение и оно будет отправлено Алине 🤖');
}