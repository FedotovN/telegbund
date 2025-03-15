import { bot } from './config.js';
import { messageHandler } from "../helpers/handle-message/handle-message.helper.js";
import { keyboardInputHandler } from "../helpers/handle-keyboard.helper.js";

export function setupBotListeners(): void {
    bot.on('message', messageHandler)
    bot.on('callback_query', keyboardInputHandler)
}