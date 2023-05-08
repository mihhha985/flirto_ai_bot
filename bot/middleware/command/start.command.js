const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");
const db = require("../../connection/db.connection");
const User = require("../../model/user.model");
//const LocalSession = require('telegraf-session-local');
//bot.use((new LocalSession({database: 'example_db.json'})).middleware())

module.exports = bot.start(async (ctx) => {
   try {
      await db.sync({ alter: true });
      const startPayload = ctx.startPayload;
      const chatID = `${ctx.chat.id}`;
      const firstName = ctx.chat.first_name;
      const lastName = ctx.chat.last_name;
      const username = ctx.chat.username;
      
      const foundUser = await User.findOne({where:{chatID:chatID}});

      if (!foundUser) {
         const user = await User.create({
            chatID: chatID,
            firstName: firstName,
            lastName: lastName,
            username: username,
            isPremium: false,
            startPayload: startPayload
         });
      }else{
         await User.update({updatedAt: Date.now()}, {where: {chatID: chatID}});
      }
      
      await ctx.replyWithHTML(`Привет, <b>${firstName}</b>!`);
      await ctx.replyWithHTML('Для того чтобы нейросеть <b>Flirto AI</b> смогла подобрать Вам идеального партнёра, ответьте на несколько вопросов...');
      await ctx.replyWithHTML('Укажите ваш <b>ПОЛ</b>', Markup.inlineKeyboard([
         [
            Markup.button.callback('Мужской', 'men-wizard-start'), 
            Markup.button.callback('Женский', 'women-wizard-start'),
         ],
      ]));

      return ctx.scene.leave();
   } catch (e) {
      console.log(e);
   }
});