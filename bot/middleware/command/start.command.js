const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");
const db = require("../../connection/db.connection");
const User = require("../../model/user.model");
//const LocalSession = require('telegraf-session-local');
//bot.use((new LocalSession({database: 'example_db.json'})).middleware())

module.exports = bot.start(async (ctx) => {
   try {
      await db.sync();
      const startPayload = ctx.startPayload;
      const chatID = ctx.chat.id;
      const firstName = ctx.chat.first_name;
      const lastName = ctx.chat.last_name;
      const username = ctx.chat.username;
      
      const foundUser = await User.findOne({where:{chatID:ctx.chat.id}});

      if (!foundUser) {
         const user = await User.create({
            chatID: chatID,
            firstName: firstName,
            lastName: lastName,
            username: username,
            isPremium: false,
            startPayload: startPayload
         });
      }
      
      await ctx.replyWithHTML(`Привет, <b>${firstName}</b>!`);
      await ctx.replyWithHTML(`<b>Flirto AI</b> - это нэйросеть которая на основе полученной от Вас информации находить, наиболее подходящих вам пользавателей Telegram и отправляет сообщение с предложением познакомится с Вами. Вам больше не нужно тратить время на бесконечный просмотр профилей и бесполезные переписки, всем этим за вас займётся наша нэйросеть. Нужно просто доверится искуственному интелекту, котовый будет анатизировать тонны информаци о пользователях в сети и направлять Вам профили только тех людей которым действительно интерестно Ваше предложение и которые готовы к отношением именно с Вами. `);
      await ctx.replyWithHTML(`<b>Как всё это работает</b>! - не стоит расчитывать на какое-то волшебство, для поиска нужного именно Вам человека может уйти не один десяток запросов. Т.к нэйросеть будет учитывать Ваше поведение и проявленную активность в отношении предложенных Вам вариантов. Поэтому что бы добится нужного Вам результата пожалуйста предоставьте максимум информации о себе. И обязательно прочтите мануал о том как правильно взаимодействовать с данной нэйросетью. /manual`);
      await ctx.reply('Начать новый поиск /prompt')
   } catch (e) {
      console.log(e);
   }
});