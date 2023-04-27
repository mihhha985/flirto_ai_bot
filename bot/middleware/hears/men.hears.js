const bot = require("../../connection/token.connection");

module.exports = bot.hears("Мужской", async (ctx) => ctx.scene.enter("menWizard"));