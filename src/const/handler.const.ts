import { handleInitialMessage } from "../helper/message-handlers.helper";

export const MESSAGES_HANDLERS_DICT = {
    '/start': handleInitialMessage,
} as Record<string, (chatId: number) => unknown | Promise<unknown>>;
 