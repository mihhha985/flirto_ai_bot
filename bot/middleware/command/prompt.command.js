const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");

module.exports = bot.command("prompt", async (ctx) => {
   try {
      await ctx.replyWithHTML('Укажите ваш <b>ПОЛ</b>', Markup.inlineKeyboard([
         [
            Markup.button.callback('Мужской', 'men-wizard-start'), 
            Markup.button.callback('Женский', 'women-wizard-start'),
         ],
      ]).resize())
   } catch (e) {
      console.log(e);
   }
});