const bot = require("../../connection/token.connection");

bot.action('women-wizard-start', async ctx =>  {
    console.log(ctx);
    ctx.scene.enter("womenWizard")
});
