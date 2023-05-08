const CronJob = require('cron').CronJob;
const bot = require('../bot/connection/token.connection');
const User = require('../bot/model/user.model');
const fs = require('fs');
const path = require('path');
const task = require('../data/task');

let successUser = 0;
let errorUser = 0;
let totalUser = 0;
let count = -1;
const errorPath = path.resolve(__dirname, '..', 'log', 'cron-error.log');
const successPath = path.resolve(__dirname, '..', 'log', 'cron-success.log');
console.log(errorPath);
console.log(successPath);
const getDate = (time) => {
    let date = new Date(Number(time));
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return (day + '.' + month + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + minute);
}

const job = new CronJob(
    '0 0 */1 * * *',
    async function() {
        try{ 
            count++;
            if(task.length === count) job.stop();
            if(task[count] === undefined) throw new Error('Empty task');
            let {countUser, rows} = await User.findAndCountAll({attributes: ['chatID', 'firstName']});
            totalUser = countUser;

            let i = 0;
            let interval = setInterval(async () => { 
                let chat;
                              
                try{ 
                    if(rows[i] === undefined) throw new Error('Empty chat');
                    chat = rows[i].chatID;
                    console.log('---', chat, '---');
                    console.log('COUNT: ' + count + ', ID: ' + task[count].id + ' -' + task[count].title);
                    
                    await bot.telegram.sendPhoto(chat, `${task[count].photo}`);
                    await bot.telegram.sendMessage(chat, `<b>${task[count].title}</b>\n<pre>${task[count].params}</pre>`, {
                        parse_mode:'HTML',
                        reply_markup:{
                            inline_keyboard: [
                                [{text: 'Перейти', url: task[count].url}]
                            ]
                        }
                    });

                    successUser++;
                }catch(e){
                    clearInterval(interval);                  
                    if(e.message !== 'Empty chat'){
                        let error = e.message.split(': ');
                        errorUser++;
                        fs.appendFileSync(errorPath, e.message + ' - ' + chat + ' at - ' + getDate(Date.now()) + '\n');
                        if(error[0] === '403' && error[1] === 'Forbidden' && error[2] === 'bot was blocked by the user')
                            await User.destroy({where: {chatID: chat}});
                    }

                   console.log(e.message);
                }
            
                i++;
                if(i === totalUser) clearInterval(interval);
            }, 1000);

            //let msg = `Total users: ${totalUser}\nSuccess users: ${successUser}\nError user ${errorUser}\n---------------\n`;
            //fs.appendFileSync(successPath, msg)
            
        }catch(e){
            console.log(e.message);
            if(e.message !== 'Empty task'){
                errorUser++;
                fs.appendFileSync(errorPath, e.message + ' at - ' + getDate(Date.now()) + '\n');
                await User.destroy({where: {chatID: chat}});
            }
        }
    },
    function(){
        let time = Date.now(); 
        let msg = `--- Task completad at time ${getDate(time)} ---\n`;
        fs.appendFile(successPath, msg, err => {
            if(err) console.log(err);
        });
    },
    true,
    'Europe/Moscow'
);

module.exports = job;