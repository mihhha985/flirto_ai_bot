const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");

module.exports = bot.start(async (ctx) => {    
  await ctx.replyWithHTML(`Привет, <b>${ctx.from.first_name}</b>!`);
  await ctx.replyWithHTML('Для того чтобы нейросеть <b>Flirto AI</b> смогла подобрать Вам идеального партнёра, ответьте на несколько вопросов...');
  await ctx.replyWithHTML('Укажите ваш <b>ПОЛ</b>', Markup.inlineKeyboard([
  	[
      Markup.button.callback('Мужской', 'men-wizard-start'), 
      Markup.button.callback('Женский', 'women-wizard-start'),
  	],
  ]));

  return ctx.scene.leave();
});