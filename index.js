const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");

sql.open("./ak-attendance.sqlite");

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity(">present for Attendance", {type: "WATCHING"});
  
});

bot.on("message", async message => {
if (message.author.bot) return;
if (message.channel.type !== "text") return;  
  
let prefix = botconfig.prefix;
  
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args =  messageArray.slice(1);  
	
	
if (cmd === `${prefix}create`) {
   sql.run('CREATE TABLE IF NOT EXISTS attendance (id TEXT, attendance_date TEXT)').then(row => {  
   }).catch(() => {
     message.reply(`${error}`);	   
   });	   
}	

                                    
  
});



bot.login(process.env.BOT_TOKEN);
