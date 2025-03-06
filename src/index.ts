import { setupBotListeners } from "./bot/bot-listeners";

async function startApp() {
    setupBotListeners();
}

startApp().then(() => {
    console.log('bot started!');
});