const bot = require("../../connection/token.connection");

module.exports = bot.command("manual", async (ctx) => {
   let msg = '1 - Ответьте на несколько простых вопросов.\n\n';
   msg += '2 - В конце перечислите через запятую все качества, которые вы, хотели бы видеть в человеке.\n\n';
   msg += '3 - Произведите оплату в соответствии с выбранным количеством анкет.\n\n';
   msg += '4 - Каждый день бот будет присылать Вам новых пользователей Telegram которые соответствуют вашему запросу.\n\n';
   msg += '5 - Отлично!!! Наслаждайтесь каждый день новыми знакомствами!';
   try {
      await ctx.replyWithHTML('<b>Инструкция по использованию бота Flirto AI</b>');
      await ctx.replyWithHTML(msg);
      return ctx.scene.leave();
   } catch (e) {
      console.log(e);
   }
});