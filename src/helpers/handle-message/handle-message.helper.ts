import type { Message } from "node-telegram-bot-api";
import { bot, config } from "../../bot/config.js";
import { MESSAGES_HANDLERS_DICT } from "../../const/handler.const.js";
import { isSentByHusband, isSentByWife } from "./../is-sent-by.helper.js";
import { ACCESS_DENIED_STICKER, NOT_TEXT_MESSAGE_STICKER } from "../../const/sticker.const.js";
import { ADMIN_MESSAGES_HANDLER_DICT } from "../../const/admin-handler.const.js";
import { checkAdminUser, checkClientUser, hasAdminUser } from "../../bot/bot-users.js";
import { addNewQuote } from "../../database/add-new-quote.js";

export async function messageHandler(message: Message): Promise<unknown> {
    const { chat, text } = message;
    const { id } = chat;

    const messageFromWife = isSentByWife(message);
    const messageFromHusband = isSentByHusband(message);
    const shouldNotRespond = !messageFromWife && !messageFromHusband;

    if (shouldNotRespond) {
        await bot.sendMessage(id, 'Бип-боп. В доступе отказано.');
        await bot.sendSticker(id, ACCESS_DENIED_STICKER);
        return
    }

    if (!text) {
        await bot.sendMessage(id, 'Бип-боп. Ниче непон 🤖');
        await bot.sendSticker(id, NOT_TEXT_MESSAGE_STICKER);
        return;
    }
    if (messageFromWife) {
        return handleWifeMessage(message);
    }
    return handleHusbandMessage(message);
}

async function handleHusbandMessage(message: Message): Promise<unknown> {
    const { chat, text } = message;
    const { id } = chat;

    if (!text) return;
    try {
        await checkAdminUser(id);

        const handler = ADMIN_MESSAGES_HANDLER_DICT[text];
        if (handler) return handler(id)

        return await addNewQuote(id, text);
    } catch (e) {
        console.error(e);
        await bot.sendMessage(id, `Ошибка 500. Попытаюсь вывести сюда:\n${e}`)
    }
}
async function handleWifeMessage(message: Message): Promise<Message | unknown> {
    const { chat, text } = message;
    const { id } = chat;

    if (!text) return;
    try {
        await checkClientUser(id);

        const handler = MESSAGES_HANDLERS_DICT[text];
        if (handler) return await handler(id)

        const isAlarm = shouldInvokeAlarm(text);
        if (isAlarm) return await handleAlarm(id);

        const response = getResponseByRegexMatch(text);
        if (response) return await bot.sendMessage(id, response);

        return await bot.sendMessage(id, 'Ошибка 422: Я нихера не понял бип-боп ❤️');
    } catch (e) {
        console.error(e);
        await bot.sendMessage(id, 'Ошибка 500: Никита рукожоп.\nВы что-то мне отправили но пока я пытался это обработать у меня всё сломалось 😭\nОбратитесь к Никите')
    }
}
async function handleAlarm(id: number) {
    if (hasAdminUser()) {
        const { chatId } = config.adminUser!.dataValues;
        await bot.sendMessage(chatId, 'ВНИМАНИЕ. Алина сообщила что ей плохо. Направьте обнимажки в срочном порядке');
        await bot.sendMessage(id, 'ТРЕВОГА. Протокол "Алине плохо" запущен. Сигнал передан в главный отдел эмоциональной поддержки');
        return;
    }
    await bot.sendMessage(id, 'ТРЕВОГА. Протокол "Алине плохо" запущен. Мы не смогли передать сигнал в главный отдел эмоциональной поддержки');
    await bot.sendMessage(id, 'Пожалуйста, обратитесь к Никите очно 🤖');
    return;
}
function shouldInvokeAlarm(text: string): boolean {
    const badRegex = /(^|\s)плохо(\s|$)/i;
    return Boolean(text.match(badRegex));
}
function getResponseByRegexMatch(text: string) {
    const loveRegex = /(?:я\s+тебя\s+люблю|люблю\s+тебя|люблю)/i;
    if (text.match(loveRegex)) {
        return 'Мои транзисторы трепещат при виде тебя богиня 🤖'
    }
}