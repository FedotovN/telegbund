import { setupBotListeners } from "./bot/bot-listeners.js";
import { connectToDatabase } from "./database/config.js";
import { onBotStartup } from "./bot/bot-startup.js";

async function startBot() {
    await connectToDatabase();
    await onBotStartup()
    setupBotListeners();
}

startBot().then(() => {
    console.log("We're online 🤖✅");
});