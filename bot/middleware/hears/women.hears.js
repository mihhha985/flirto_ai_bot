const bot = require("../../connection/token.connection");

module.exports = bot.hears("Женский", async (ctx) => ctx.scene.enter("womenWizard"));