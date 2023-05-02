const { Markup, Scenes, Composer } = require("telegraf");
const Prompt = require("../../model/prompt.model");
const User = require("../../model/user.model");
//const girls = require('../../../data/girls');

const startStep = new Composer();
startStep.action('men-wizard-start', async (ctx) => {
   try {
      const user = await User.findOne({where:{chatID:ctx.chat.id}});
      if(user){
         ctx.wizard.state.data = {};
         ctx.wizard.state.data.id = user.id;
         ctx.wizard.state.data.is_premium = user.isPremium;
         ctx.wizard.state.data.premium_count = user.premiumCount;
         ctx.wizard.state.data.gender = ctx.callbackQuery.data;
         await ctx.reply("Выберите тип отношений",  Markup.inlineKeyboard([
            [
               Markup.button.callback('Романтика', 'it-is-loves'), 
               Markup.button.callback('Стану спонсором', 'to-be-sponsor'),
            ],
            [
               Markup.button.callback('Интим встреча', 'intims-meets'),
               Markup.button.callback('Ищу спонсора', 'find-to-sponsor'),
            ],
         ]).resize());
         return ctx.wizard.next();
      }else{
         return ctx.scene.leave();
      }
   } catch (e) {
      console.log(e);
   }
});

const twoStep = new Composer();
twoStep.action('it-is-loves', async (ctx) => {
   try {
      ctx.wizard.state.data.type = ctx.callbackQuery.data;
      console.log('two-step', ctx.wizard.state.data);
      await ctx.reply("Каков ваш ежемесячный доход?",  Markup.inlineKeyboard([
            [
               Markup.button.callback('50 000 - 100 000 рублей', 'minimal-price'), 
               Markup.button.callback('100 000 - 300 000 рублей', 'normal-price'),
            ],
            [
               Markup.button.callback('300 000 - 500 000 рублей', 'medium-price'), 
               Markup.button.callback('от 500 и выше рублей', 'hight-price'),
            ],
      ]));

      return ctx.wizard.next();
   }catch(e){
      console.log(e);
   }
});

twoStep.action('to-be-sponsor', async (ctx) => {

   try {
      ctx.wizard.state.data.type = ctx.callbackQuery.data;
      await ctx.reply("Какую сумму готовы тратить на девушку в месяц?",  Markup.inlineKeyboard([
            [
               Markup.button.callback('50 000 - 100 000 рублей', 'minimal-price'), 
               Markup.button.callback('100 000 - 300 000 рублей', 'normal-price'),
            ],
            [
               Markup.button.callback('300 000 - 500 000 рублей', 'medium-price'), 
               Markup.button.callback('от 500 и выше рублей', 'hight-price'),
            ],
      ]));

      return ctx.wizard.next();
   }catch(e){
      console.log(e);
   }
});

twoStep.action('intims-meets', async (ctx) => {
   try {
      ctx.wizard.state.data.type = ctx.callbackQuery.data;
      await ctx.reply("Какую сумму вы готовы предложить девушке за встречу",  Markup.inlineKeyboard([
            [
               Markup.button.callback('1 000 - 5 000 рублей', 'minimal-price'), 
               Markup.button.callback('5 000 - 10 000 рублей', 'normal-price'),
            ],
            [
               Markup.button.callback('10 000 - 50 000 рублей', 'medium-price'), 
               Markup.button.callback('от 50 000 и выше рублей', 'hight-price'),
            ],
      ]));

      return ctx.wizard.next();
   }catch(e){
      console.log(e);
   }
});

twoStep.action('find-to-sponsor', async (ctx) => {
   try {
      ctx.wizard.state.data.type = ctx.callbackQuery.data;
      await ctx.reply("Какую сумму в месяц, вы хотели бы получать?",  Markup.inlineKeyboard([
            [
               Markup.button.callback('50 000 - 100 000 рублей', 'minimal-price'), 
               Markup.button.callback('100 000 - 300 000 рублей', 'normal-price'),
            ],
            [
               Markup.button.callback('300 000 - 500 000 рублей', 'medium-price'), 
               Markup.button.callback('от 500 и выше рублей', 'hight-price'),
            ],
      ]));

      return ctx.wizard.next();
   }catch(e){
      console.log(e);
   }
});
   
const threeStep = new Composer();
threeStep.on('callback_query', async (ctx) => {
   try {
      ctx.wizard.state.data.price = ctx.callbackQuery.data;
      console.log('three-step', ctx.wizard.state.data);
      await ctx.reply("Укажите по какому городу или области нужно осуществить поиск", Markup.removeKeyboard);
      return ctx.wizard.next();
   }catch(e){
      console.log(e);
   }   
});

const fourStep = new Composer();
fourStep.on('message', async (ctx) => {
   try {
      ctx.wizard.state.data.location = ctx.message.text;
      if(ctx.wizard.state.data.is_premium){
         await ctx.replyWithHTML('Уточнить запрос с помощью методa <i>"prompt"</i> ???', Markup.inlineKeyboard([
            [
               Markup.button.callback('Да', 'enter-prompt'),
               Markup.button.callback('Нет', 'next-step'), 
            ]
         ]));
      }else{
         await ctx.replyWithHTML('Уточнить запрос с помощью методa <i>"prompt"</i> ???');
         await ctx.replyWithHTML("<b>Внимание</b> доступно только с <i>Premium</i> подпиской", Markup.inlineKeyboard([
            [
               Markup.button.callback('Пропустить', 'next-step'), 
               Markup.button.callback('Оплатить', 'start_payment')
            ]   
         ]));
      }

      return ctx.wizard.next();
   }catch(e){
      console.log(e);
   }   
});

const fiveStep = new Composer();
fiveStep.action('enter-prompt', async (ctx) => {
   ctx.replyWithHTML('Опишите своими словами <b>тип девушки</b>, с которой вы хотели бы встретиться');
   return ctx.wizard.next();
});

fiveStep.action('next-step', async (ctx) => {
   ctx.replyWithHTML('<b>Внимание!!!</b>\nЕсли не уточнить запрос результат будет абсолютно рандомный.', Markup.keyboard([
      Markup.button.text('Понятно')
   ]).oneTime().resize());

   return ctx.wizard.next();
});

const sixStep = new Composer();
sixStep.on('message', async (ctx) => {
   console.log(ctx.message);
   ctx.wizard.state.data.search = ctx.message.text;
   if(ctx.wizard.state.data.is_premium){
      await ctx.replyWithHTML('<b>Начать новый поиск</b>\nУкажите какое количество анкет вам нужно предоставить', Markup.inlineKeyboard([
         [
            Markup.button.callback('10шт', '10'), 
            Markup.button.callback('25шт', '25'),
         ],
         [
            Markup.button.callback('50шт', '50'), 
            Markup.button.callback('100шт', '100'),
         ]
      ]));
   }else{
      await ctx.replyWithHTML('<b>Начать новый поиск</b>\nУкажите какое количество анкет вам нужно предоставить');
      await ctx.replyWithInvoice(getInvoice(ctx.from.id, 10, 289, '10 - анкет'));
      await ctx.replyWithInvoice(getInvoice(ctx.from.id, 25, 320, '25 - анкет'));
      await ctx.replyWithInvoice(getInvoice(ctx.from.id, 50, 380, '50 - анкет'));
      await ctx.replyWithInvoice(getInvoice(ctx.from.id, 100, 450, '100 - анкет'));
   }
   return ctx.wizard.next();
});

const finishText = '<b>Осуществляю поиск по вашему запросу</b>\nОжидайте в течении 72часов вам будут приходить сообщения с анкетами девушек, которые по мнению нашего алгоритма наиболее Вам подходят';
const finishStep = new Composer();
finishStep.on('callback_query', async (ctx) => {
   const count = ctx.callbackQuery.data;
   await ctx.replyWithChatAction('typing');
   await ctx.answerCbQuery('Осуществляю поиск по вашему запросу');
   await createPrompt({...ctx.wizard.state.data, count:count});

   if(ctx.wizard.state.data.is_premium){
      await User.update({ premiumCount: Number(ctx.wizard.state.data.premium_count) - Number(count) }, {
         where: {
            id: ctx.wizard.state.data.id
         }
       });
   }
   /*
   girls.forEach(girl => {
      setTimeout(() => false, 800);
      ctx.replyWithHTML(`<a href="${girl.username}">${girl.firts_name}</a>`);    
   });
  */
   await ctx.replyWithHTML(finishText);
   return ctx.scene.leave();
});

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

const getInvoice = (id, count, amount, title) => {
   const invoice = {
     chat_id: id,
     provider_token: process.env.PAY_TOKEN,
     start_parameter: `${id}_${Number(new Date())}_low_premium`,
     title: title,
     description:'Оплатить одноразовый поиск по вашему запросу',
     currency: 'RUB',
     prices: [{ label: title, amount: amount * 100 }],
     payload: {
      id: id,
      date:Number(new Date()),
      count: count,
      type: 'disposable'
     }
   }
 
   return invoice
 }

module.exports = new Scenes.WizardScene("menWizard", startStep, twoStep, threeStep, fourStep, fiveStep, sixStep, finishStep);