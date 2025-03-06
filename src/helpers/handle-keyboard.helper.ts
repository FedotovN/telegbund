import type { CallbackQuery } from "node-telegram-bot-api";
import { bot } from "../bot/config.js";

export async function keyboardInputHandler(query: CallbackQuery): Promise<unknown> {
    const { message, data } = query;
    if (!message) return;
    const { chat } = message;
    const { id } = chat;
    if (data !== 'what-to-do') return;
    await bot.sendMessage(id, 'Ничего! Таймер уже завёлся и пошёл!\nОжидай спонтанных сообщений - они будут либо через час, либо через два дня. СПОНТАННО! 🤯');
}