const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");

module.exports = bot.command("manual", async (ctx) => {
   try {
      ctx.reply('Инструкция в разработке');
   } catch (e) {
      console.log(e);
   }
});