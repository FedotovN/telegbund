import { bot } from './config.js';
import { messageHandler } from "../helper/handle-message.helper.js";
import { keyboardInputHandler } from "../helper/handle-keyboard.helper.js";

export function setupBotListeners(): void {
    bot.on('message', messageHandler)
    bot.on('callback_query', keyboardInputHandler)
}