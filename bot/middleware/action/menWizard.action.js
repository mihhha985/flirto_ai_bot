const bot = require("../../connection/token.connection");

bot.action('men-wizard-start', async ctx => ctx.scene.enter("menWizard"));
