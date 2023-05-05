const girls = require('../data/girls');
const CronJob = require('cron').CronJob;
const bot = require('../bot/connection/token.connection');
const User = require('../bot/model/user.model');
const fs = require('fs');
const path = require('path');

let taskArray = girls;
let totalTask = girls.length;
let successUser = 0;
let errorUser = 0;
let totalUser = 0;
const errorPath = path.join(__dirname, 'log', 'cron-error.log');
const successPath = path.join(__dirname, 'log', 'cron-success.log');
const getDate = (time) => {
    let date = new Date(Number(time));
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return (day + '.' + month + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + minute);
 }

const job = new CronJob(
    '0 */3 * * * *',
    async function() {
        if(taskArray.length === 0) job.stop();

        try{
            let i = 0;
            let task = taskArray.splice(0, 5);

            let {count, rows} = await User.findAndCountAll({attributes: ['chatID', 'firstName']});
            totalUser = count;

            let timer = setInterval(function() {
                let j = 0;
                let chat = rows[i].chatID;
                console.log('---', chat, '---');
                let interval = setInterval(async () => {
                    try{ 
                        if(task[j] === undefined) throw new Error('Empty object')     
                        console.log(task[j]);
                        let result = await bot.telegram.sendMessage(chat, `${task[j].id} - <a href="${task[j].username}">${task[j].firts_name}</a>`, {
                            parse_mode: 'HTML'
                        });

                    }catch(e){
                        clearInterval(interval);
                        if(e.message !== 'Empty object'){
                            errorUser++;
                            fs.appendFileSync(errorPath, e.message + ' - ' + chat + ' at - ' + getDate(Date.now()) + '\n');
                            await User.destroy({where: {chatID: chat}});
                        }
                    }
                    
                    j++;
                    if(j === 5) clearInterval(interval);
                }, 1000);


                i++;
                successUser++;
                if(i === count) clearInterval(timer);
            }, 10000); 

            if(taskArray && taskArray.length > 0){
                let msg = `Total task: ${totalTask}\nSuccess task: ${totalTask - taskArray.length}\nTotal users: ${totalUser}\nSuccess users: ${successUser}\nError user ${errorUser}\n---------------\n`;
                fs.appendFile(successPath, msg, err => {
                    if(err) throw err;
                });
            }    
        }catch(e){
            console.log(e.message);
        }
    },
    function(){
        let time = Date.now(); 
        let msg = `--- Task completad at time ${getDate(time)} ---\n`;
        fs.appendFile(successPath, msg, err => {
            if(err) throw err;
        });
    },
    true,
    'Europe/Moscow'
);

module.exports = job;