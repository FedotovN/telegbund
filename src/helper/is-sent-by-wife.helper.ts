import type { Message } from "node-telegram-bot-api";
import { WIFE_TELEGRAM_ID } from "../environment";

export function isSentByWife(message: Message): boolean {
    const { from } = message;
    if (!from) return false;
    return from.id === Number(WIFE_TELEGRAM_ID);
}