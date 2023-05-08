const { Markup, Scenes, Composer } = require("telegraf");
const Prompt = require("../../model/prompt.model");
const User = require("../../model/user.model");
//const girls = require('../../../data/girls');

const startStep = new Composer();
startStep.action('men-wizard-start', async (ctx) => {
   try {
      const user = await User.findOne({where:{chatID:`${ctx.chat.id}`}});
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
      let price = ctx.callbackQuery.data;
      if(price === 'minimal-price' || price === 'normal-price' || price === 'medium-price' || price === 'hight-price'){
         ctx.wizard.state.data.price = price;
         await ctx.reply("Укажите по какому городу или области нужно осуществить поиск", Markup.removeKeyboard);
         return ctx.wizard.next();
      }else{
         await ctx.replyWithHTML('<b>Неверное действие!!!</b>\n\nПожалуйсто перезагрузите бота командой\n<i>/start</i>');
         return ctx.scene.leave();
      }  
   }catch(e){
      console.log(e);
   }   
});

const fourStep = new Composer();
fourStep.on('message', async (ctx) => {
   try {
      let location = `${ctx.message.text.trim()}`;
      if(location === '/start' || location === '/menu' || location === '/manual'){
         await ctx.replyWithHTML('<b>Неверное действие!!!</b>\n\nПожалуйсто перезагрузите бота командой\n<i>/start</i>');
         return ctx.scene.leave();
      }else{
         ctx.wizard.state.data.location = location;
         await ctx.replyWithHTML('Опишите максимально подробно тип девушки, и черты её характера. Что по Вашему мнению должно быть на первом месте!');
         return ctx.wizard.next();
      }   
   }catch(e){
      console.log(e);
   }   
});

const fiveStep = new Composer();
fiveStep.on('message', async (ctx) => {
   let search =  ctx.message.text;
   if(search === '/start' || search === '/menu' || search === '/manual'){
      await ctx.replyWithHTML('<b>Неверное действие!!!</b>\n\nПожалуйсто перезагрузите бота командой\n<i>/start</i>');
      return ctx.scene.leave();
   }else{
      ctx.wizard.state.data.search = search;
      await ctx.replyWithHTML('<b>Начать новый поиск</b>\nУкажите какое количество анкет вам нужно предоставить', Markup.inlineKeyboard([
         [
            Markup.button.callback('10шт - 289руб.', '10'), 
            Markup.button.callback('25шт - 320руб.', '25'),
         ],
         [
            Markup.button.callback('50шт - 380руб.', '50'), 
            Markup.button.callback('100шт - 460руб.', '100'),
         ]
      ]));
   }   
});

const sixStep = new Composer();
sixStep.on('callback_query', async ctx => {
   let count = ctx.callbackQuery.data;
   if(count === '10' || count === '25' || count === '50' || count === '100'){
      let sum;
      switch(count) {
         case '10':
            sum = '289';
            break;
         case '25':
            sum = '320';
            break;
         case '50':
            sum = '380';
            break;
         default:
            sum = '460';
      }

      let {id} = await createPrompt({...ctx.wizard.state.data, count:count});
      ctx.wizard.state.data.prompt = id;
      await ctx.replyWithHTML('Оплатить поиск анкет по вашему запросу', Markup.keyboard([
         Markup.button.text('Произвёл оплату'),
      ]).oneTime().placeholder().resize());

      await ctx.replyWithHTML(`Сумма: ${sum} рублей`, Markup.inlineKeyboard([
         Markup.button.url('Оплатить', 'https://my.qiwi.com/Elena-SQibjutSPs')
      ]));

      return ctx.wizard.next(); 
   }else{
      return ctx.scene.leave();
   }   
})

const sevenStep = new Composer();
sevenStep.on('message', async ctx => {
   if(ctx.message.text === 'Произвёл оплату'){
      await ctx.replyWithHTML('<b>Ура!!! Спасибо за оплату!\nПожалуйста, отправьте чек в ответном сообщении...</b>');
      return ctx.wizard.next();
   }else{
      return ctx.scene.leave();
   }
});

const finishText = '<b>Осуществляю поиск по вашему запросу</b>\nОжидайте в течении 72часов вам будут приходить сообщения с анкетами девушек, которые по мнению нашего алгоритма наиболее Вам подходят';
const finishStep = new Composer();
finishStep.on('photo', async (ctx) => {
   //console.log('PROMPT ID: ' + ctx.wizard.state.data.prompt);
   await Prompt.update({ status: 1 }, {
      where: {
         id: Number(ctx.wizard.state.data.prompt),
      }
   });

   await ctx.replyWithChatAction('upload_photo');
   await ctx.replyWithHTML(finishText);
   return ctx.scene.leave();
});

const createPrompt = async ({gender, type, price, location, search, count, id}) => {
   return await Prompt.create({
      gender: gender,
      typeMeet:type,
      price: price,
      location: location,
      prompt: search,
      count: count,
      userId:id
   });
}

module.exports = new Scenes.WizardScene("menWizard", startStep, twoStep, threeStep, fourStep, fiveStep, sixStep, sevenStep, finishStep);