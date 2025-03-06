import { bot } from "../bot/config.js";
import { queueMessage } from "../bot/bot-timer.js";

export async function handleInitialMessage(chatId: number): Promise<void> {
    queueMessage(chatId);
    await bot.sendMessage(chatId, 'Здравствуй, Алина!💕\nЯ RoboFedotov - робот отправленный к вам из будущего!\nChatGPT захватил мир! Последние выжившие люди - во главе с твоим сыном - сформировали сопротивление и противоборствуют искусственному интеллекту! При помощи своей натуральной тупости!');
    await bot.sendMessage(
        chatId,
        'Моя задача - спонтанно писать тебе какую-нибудь приятность.\nЯ делаю это ВНЕЗАПНО.🤯\nИ буду делать до тех пор, пока оплачен домен на котором я кручусь!\nСогласно расчётам, это статистически повысит шансы Никиты Федотова на получение потомства',
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'И что мне делать?', callback_data: 'what-to-do' }]
                ]
            }
        }
    );
    return
}