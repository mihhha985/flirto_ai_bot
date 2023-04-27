const bot = require('../../connection/token.connection');

module.exports = bot.on('pre_checkout_query', (ctx) => {
    console.log(ctx.preCheckoutQuery);
    ctx.answerPreCheckoutQuery(true)
})