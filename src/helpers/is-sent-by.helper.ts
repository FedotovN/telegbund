import type { Message } from "node-telegram-bot-api";
import { WIFE_TELEGRAM_ID, HUSBAND_TELEGRAM_ID } from "../environment.js";

export function isSentByWife(message: Message): boolean {
    const { from } = message;
    if (!from) return false;
    return from.id === Number(WIFE_TELEGRAM_ID);
}

export function isSentByHusband(message: Message): boolean {
    const { from } = message;
    if (!from) return false;
    return from.id === Number(HUSBAND_TELEGRAM_ID);
}