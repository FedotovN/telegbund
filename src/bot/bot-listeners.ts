import { bot } from './config';
import { messageHandler } from "../helper/handle-message.helper";
import { keyboardInputHandler } from "../helper/handle-keyboard.helper";

export function setupBotListeners(): void {
    bot.on('message', messageHandler)
    bot.on('callback_query', keyboardInputHandler)
}