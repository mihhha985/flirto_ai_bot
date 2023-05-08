const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");
const User = require("../../model/user.model");
const Prompt = require("../../model/prompt.model");
const {getDateFromTimestamt} = require("../../../helpers/date");

const info = (user, count, lastPrompt) => {
   const text = `<b>Мой аккаунт</b>\n<i>Вся необходимая информация о вашем профиле</i>\n\n`
         + `ID: ${user.chatID}\nТелефон: ${user.phone || '***'}\nДата регистрации: ${getDateFromTimestamt(user.createdAt)}\n\n`
         + `Premium: ${user.isPremium ? 'Активна' : 'Не активна'}\n`
         + `Подписка до ${user.isPremium ? getDateFromTimestamt(user.premiumTime) : '---'}\n`
         + `Лимит запросов: ${user.premiumCount === null ? '0' : user.premiumCount}\n\n`
         + `<b>Моя статистика запросов</b>\nВсего запросов: ${count}\n`
         + `Дата поледнего запроса: ${lastPrompt === null ? '---' : getDateFromTimestamt(lastPrompt.created)}`
         + `\nКол-во показанных анкет: ${lastPrompt === null ? '0' : lastPrompt.count}`
      ;
      
   return text;
}

module.exports = bot.command("menu", async (ctx) => {
   try {
      const id = `${ctx.message.from.id}`;
      const user = await User.findOne({where: {chatID: id}});
      if(user){
         const {count} = await Prompt.findAndCountAll({where: {userId: user.id}});
         const lastPrompt = await Prompt.findOne({
            order: [['id', 'DESC']],
            where: {userId: user.id},
         });
         
         //console.log(lastPrompt.created.getFullYear());
         await ctx.replyWithHTML(info(user, count, lastPrompt));
         return ctx.scene.leave();
      }else{
         console.log(ctx);
      }
   } catch (e) {
      console.log(e);
   }
});