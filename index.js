
// SCENES
require("./bot/middleware/scene/index.scene");

// ON
require("./bot/middleware/on/success.pay");
require("./bot/middleware/on/chechoutQuery.pay");
//require('./bot/middleware/on/callbackQuery.text');

// COMMANDS
//require("./bot/middleware/command/pay.command");
require("./bot/middleware/command/menu.command");
require("./bot/middleware/command/start.command");
require("./bot/middleware/command/manual.command");

// HEARS
//require("./bot/middleware/hears/men.hears");
//require("./bot/middleware/hears/women.hears");

// ACTION
require('./bot/middleware/action/menWizard.action');
require('./bot/middleware/action/womenWizard.action');
require('./bot/middleware/action/startPayment.action');

// CONNECTION
require("./bot/connection/local.connection");
// require("./bot/connection/lambda.connection");

//CRON
//require('./cron/daytask');