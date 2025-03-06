import { setupBotListeners } from "./bot/bot-listeners";
import { connectToDatabase } from "./database/config";

async function startApp() {
    await connectToDatabase();
    setupBotListeners();
}

startApp().then(() => {
    console.log('bot started!');
});