import { handleInitialMessage } from "../helpers/handle-message/message-handlers.helper.js";

export const MESSAGES_HANDLERS_DICT = {
    '/start': handleInitialMessage,
} as unknown as { [key: string]: (id: number) => Promise<unknown> };
 