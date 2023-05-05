const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");
const girls = require("../../../data/girls");

module.exports = bot.command("manual", async (ctx) => {
   try {
      await ctx.replyWithHTML('Инструкция в разработке');
      await ctx.replyWithPhoto(`https://mow.escort-koketka.ru/images/girl/18/ava.jpg`);
      await ctx.replyWithHTML(`<b>Элитная эскорт модель - Влада</b><pre>\nВозраст: 27лет\nРост: 174см\nВес: 60кг\nГрудь: 3 размер</pre>`, Markup.inlineKeyboard([
         Markup.button.url('Перейти', 'https://mow.escort-koketka.ru/escort-girl/vlada27')
      ]));

      await ctx.replyWithHTML('Сумма: 290 рублей', Markup.inlineKeyboard([
         Markup.button.url('Оплатить', 'https://my.qiwi.com/Elena-SQibjutSPs')
      ]));
   } catch (e) {
      console.log(e);
   }
});