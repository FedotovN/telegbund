import { saveAdminUser, saveClientUser } from "../database/users.js";
import { config } from "./config.js";
import { HUSBAND_TELEGRAM_ID, WIFE_TELEGRAM_ID } from "../environment.js";

export async function saveAndSetClientUser(userId: number, chatId: number): Promise<void> {
    if (hasClientUser()) return;
    config.clientUser = await saveClientUser(userId, chatId);;
}
export async function saveAndSetAdminUser(userId: number, chatId: number): Promise<void> {
    if (hasAdminUser()) return;
    config.adminUser = await saveAdminUser(userId, chatId);;
}

export function hasClientUser() {
    return Boolean(config.clientUser);
}
export function hasAdminUser() {
    return Boolean(config.adminUser);
}

export async function checkClientUser(chatId: number): Promise<unknown> {
    if (hasClientUser()) return config.clientUser;
    await saveAndSetClientUser(WIFE_TELEGRAM_ID, chatId);
    return config.clientUser;
}

export async function checkAdminUser(chatId: number): Promise<unknown> {
    if (hasAdminUser()) return config.adminUser;
    await saveAndSetAdminUser(HUSBAND_TELEGRAM_ID, chatId);
    return config.adminUser;
}