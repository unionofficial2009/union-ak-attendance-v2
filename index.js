const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./ak-attendance.sqlite");
let cooldown = new Set();
let cdseconds = 86400;

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity(">present for Attendance", {type: "WATCHING"});
  
});



bot.login(process.env.BOT_TOKEN);
