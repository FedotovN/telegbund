import { setupBotListeners } from "./bot/bot-listeners.js";
import { connectToDatabase } from "./database/config.js";

async function startApp() {
    await connectToDatabase();
    setupBotListeners();
}

startApp().then(() => {
    console.log('bot started!');
});