import { handleInitialAdminMessage } from "../helpers/handle-message/message-handlers.helper.js";

export const ADMIN_MESSAGES_HANDLER_DICT = {
    '/start': handleInitialAdminMessage
} as unknown as { [key: string]: (id: number) => Promise<unknown> };