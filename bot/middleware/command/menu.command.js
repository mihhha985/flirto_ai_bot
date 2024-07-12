const bot = require("../../connection/token.connection");

module.exports = bot.command("menu", async (ctx) => {
	let msg = `Имя: ${ctx.from.username}\n`;
   msg += 'Последний запрос - \n';
   msg += 'Премиум подписка - \n';
   msg += 'Личная информация - \n';
   msg += 'Баланс - 0.00';
   try {
      await ctx.replyWithHTML(`<b>Ваш профиль:</b>`);
      await ctx.replyWithHTML(msg);
      return ctx.scene.leave();
   } catch (e) {
      console.log(e);
   }
});