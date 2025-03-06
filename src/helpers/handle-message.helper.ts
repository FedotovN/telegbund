import type { Message } from "node-telegram-bot-api";
import { bot } from "../bot/config.js";
import { MESSAGES_HANDLERS_DICT } from "../const/handler.const.js";
import {isSentByWife} from "./is-sent-by-wife.helper.js";

export async function messageHandler(message: Message): Promise<unknown> {
    const { chat, text } = message;
    const { id } = chat;

    const shouldNotRespond = !isSentByWife(message);

    if (shouldNotRespond) {
        await bot.sendMessage(id, 'Кем бы ты ни был, ты не похож на мою жену! Но если ты всё таки чего-то от меня хочешь, то обратись к моему создателю, пожалуйста!');
        return
    }

    if (!text) {
        await bot.sendMessage(id, 'Я понимаю только текст!!!\nИ то не очень много 🫡');
        return;
    }

    return handleProperMessage(message);
}


async function handleProperMessage(message: Message): Promise<Message | unknown> {
    const { chat, text } = message;
    const { id } = chat;

    if (!text) return;

    const handler = MESSAGES_HANDLERS_DICT[text];
    if (handler) return handler(id)

    const response = getResponseByRegexMatch(text);
    if (response) {
        await bot.sendMessage(id, response);
        return;
    }

    return bot.sendMessage(id, 'Алинёнок!!!\nЯ хочу напомнить, что я глупенький!!! 🤨\nНепоняв что ты мне пишешь тут! умное 🦍');
}

function getResponseByRegexMatch(text: string) {
    const loveRegex = /(?:я\s+тебя\s+люблю|люблю\s+тебя|люблю)/i;
    if (text.match(loveRegex)) {
        return '🥺🥺🥺🥺\nЯ тебя тоже люблю!!! 💕'
    }
    const badRegex = /(^|\s)плохо(\s|$)/i;
    if (text.match(badRegex)) {
        return '😭\nТы сказала что что-то там плохо. Ну блиин. Попробуй написать настоящему мужу! Возможно он сделает тебе массаж ног. Или купит цветов. Ну что-то такое в общем клёвое 🦍'
    }
}