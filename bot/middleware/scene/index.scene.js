const { Scenes, session } = require("telegraf");
const bot = require("../../connection/token.connection");

const menWizard = require("./menWizard.scene");
const womenWizard = require("./womenWizard.scene");

const stage = new Scenes.Stage([menWizard, womenWizard]);

bot.use(session());
bot.use(stage.middleware());

module.exports = stage;