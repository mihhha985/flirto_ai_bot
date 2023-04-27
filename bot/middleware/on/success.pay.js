const bot = require('../../connection/token.connection');
const User = require('../../model/user.model');
const Payment = require('../../model/payment.model');
const Prompt = require('../../model/prompt.model');
//const girls = require('../../../data/girls');
const finishText = '<b>Осуществляю поиск по вашему запросу</b>\nОжидайте в течении 72часов вам будут приходить сообщения с анкетами девушек, которые по мнению нашего алгоритма наиболее Вам подходят';

const premium_tarifs = {
    low_premium: {count: 10000, time: 60 * 60 * 24 * 30 * 1000},
    midle_premium: {count: 50000, time: 60 * 60 * 24 * 30 * 3 * 1000},
    hight_premium: {count: 200000, time: 60 * 60 * 24 * 30 * 6 * 1000},
}

const createPrompt = async ({gender, type, price, location, search, count, id}) => {
    await Prompt.create({
       gender: gender,
       typeMeet:type,
       price: price,
       location: location,
       prompt: search,
       count: count,
       userId:id
    });
 }
 

// ответ в случае положительной оплаты
module.exports = bot.on('successful_payment', async (ctx, next) => {
    let payload = JSON.parse(ctx.message.successful_payment.invoice_payload);
    console.log(payload);
    if(payload.type === 'disposable'){
        const count = payload.count;
        await ctx.replyWithChatAction('typing');
        await createPrompt({...ctx.wizard.state.data, count:count});
        await ctx.replyWithHTML(finishText);
        return ctx.scene.leave();
        /*
        girls.forEach(girl => {
            setTimeout(() => false, 800);
            ctx.replyWithHTML(`<a href="${girl.username}">${girl.firts_name}</a>`);    
        });
        */
    }

    if(payload.type === 'premium'){
        const user =  await User.findOne({where:{chatID:payload.id}});
        const time = Number(premium_tarifs[payload.tarif].time) + Number(payload.date);
        const count = Number(premium_tarifs[payload.tarif].count);

        await Payment.create({
            tarif:payload.tarif,
            date:payload.date,
            userId: user.id
        });

        await User.update({ isPremium: true, premiumTime:time, premiumCount:count}, {
            where: {
            id: user.id
            }
        });
    }
});