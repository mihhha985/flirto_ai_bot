const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");

const getInvoiceLow = (id) => {
  const title = 'Тариф Premium - 1990 руб';

   const invoice = {
     chat_id: id,
     provider_token: process.env.PAY_TOKEN,
     start_parameter: `${id}_${Number(new Date())}_low_premium`,
     title: title,
     description: `- 1 месяцев Premium подписки                                                                                                       - 10 000 анкет по вашему запросу`,
     currency: 'RUB',
     prices: [{ label: title, amount:  1990 * 100 }],
     payload: {
        id: id,
        date:Number(new Date()),
        tarif:'low_premium',
        type:'premium'
    }
  }
 
  return invoice
}

 const getInvoiceMedium = (id) => {
   const title = 'Тариф Premium - 2380 руб' 
   const invoice = {
     chat_id: id,
     provider_token: process.env.PAY_TOKEN,
     start_parameter: `${id}_${Number(new Date())}_low_premium`,
     title: title,
     description: `- 3 месяцев Premium подписки                                                                                                       - 50 000 анкет по вашему запросу`,
     currency: 'RUB',
     prices: [{ label: title, amount: 2380 * 100 }],
     payload: {
        id: id,
        date:Number(new Date()),
        tarif:'midle_premium',
        type:'premium'
    }
   }
 
   return invoice
 }

 const getInvoiceHard = (id) => {
   const title = 'Тариф Premium - 2690 руб';
   const invoice = {
     chat_id: id,
     provider_token: process.env.PAY_TOKEN,
     start_parameter: `${id}_${Number(new Date())}_low_premium`,
     title: title,
     description: `- 6 месяцев Premium подписки                                                                                                       - 200 000 анкет по вашему запросу`,
     currency: 'RUB',
     prices: [{ label: title, amount: 2690 * 100 }],
     payload: {
      id: id,
      date:Number(new Date()),
      tarif:'hight_premium',
      type:'premium'
     }
   }
 
   return invoice
 }


module.exports = bot.command('pay', async (ctx) => {
   try {
      //console.log(ctx.from)
      await ctx.replyWithHTML('<b>Подключить Premium</b>\nВЫберите подходящий тариф');
      await ctx.replyWithInvoice(getInvoiceLow(ctx.from.id))
      await ctx.replyWithInvoice(getInvoiceMedium(ctx.from.id))
      await ctx.replyWithInvoice(getInvoiceHard(ctx.from.id))     
   } catch (e) {
      console.log(e);
   }
});