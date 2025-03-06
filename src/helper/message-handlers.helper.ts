import { bot } from "../bot/config";

export async function handleInitialMessage(chatId: number): Promise<void> {
    await bot.sendMessage(chatId, 'Здравствуй, Алина!💕\nЯ TelegBund (Telegram Husband) - робот который создан чтобы дарить тебе улыбки, которые ты заслуживаешь!');
    await bot.sendMessage(
        chatId,
        'Моя задача - спонтанно писать тебе какую-нибудь приятность.\nЯ делаю это ВНЕЗАПНО.🤯\nИ буду делать до тех пор, пока оплачен домен на котором я кручусь!',
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