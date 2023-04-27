const { Markup } = require('telegraf');
const bot = require('../../connection/token.connection');
const fs = require('fs');
const path = require('path');
const girls = require('../../../data/girls');

module.exports = bot.on('callback_query', async (ctx) => {
    //console.log(ctx); 
    await ctx.answerCbQuery('ок');
    girls.forEach(async girl => {
        await ctx.replyWithChatAction('typing');
        await ctx.replyWithHTML(`<a href="${girl.username}">${girl.firts_name}</a>`);    
    });
})