const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");
const User = require("../../model/user.model");
const Prompt = require("../../model/prompt.model");

const getCreatedUserDate = (time) => {
   let date = new Date(Number(time));
   let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
   let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
   return (day + '.' + month + '.' + date.getFullYear());
}

const info = (user, count, lastPrompt) => {
   const text = `<b>Мой аккаунт</b>\n<i>Вся необходимая информация о вашем профиле</i>\n\n`
         + `ID: ${user.chatID}\nТелефон: ${user.phone || '***'}\nДата регистрации: ${getCreatedUserDate(user.created)}\n\n`
         + `Premium: ${user.isPremium ? 'Активна' : 'Не активна'}\n`
         + `Подписка до ${user.isPremium ? getCreatedUserDate(user.premiumTime) : '---'}\nЛимит запросов: ${user.premiumCount}\n\n`
         + `<b>Моя статистика запросов</b>\nВсего запросов: ${count}\n`
         + `Дата поледнего запроса: ${lastPrompt === null ? '---' : getCreatedUserDate(lastPrompt.created)}`
         + `\nКол-во показанных анкет: ${lastPrompt === null ? '0' : lastPrompt.count}`
      ;
      
   return text;
}

module.exports = bot.command("menu", async (ctx) => {
   try {
      const id = ctx.message.from.id;
      const user = await User.findOne({where: {chatID: id}});
      if(user){
         const allPrompts = await Prompt.findAndCountAll({where: {userId: user.id}});
         const lastPrompt = await Prompt.findOne({
            order: [['id', 'DESC']],
            where: {userId: user.id},
         });
         
         await ctx.replyWithHTML(info(user, allPrompts.count, lastPrompt));
      }else{
         console.log(ctx);
      }
   } catch (e) {
      console.log(e);
   }
});