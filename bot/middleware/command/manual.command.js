const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");

module.exports = bot.command("manual", async (ctx) => {
   try {
      ctx.reply('eny text', Markup.inlineKeyboard([
         Markup.button.callback('10шт - 290 рублей', '10'),
         Markup.button.callback('50шт - 360 рублей', '20')
      ]))
   } catch (e) {
      console.log(e);
   }
});