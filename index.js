const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
let cooldown = new Set();
let cdseconds = 1;

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("*present for Attendance", {type: "WATCHING"});
  
});

bot.on("message", async message => {
if(message.author.bot) return;
if(message.channel.type === "dm") return;
  
let prefix = botconfig.prefix;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
  return message.reply("You have to wait 1 day.")
  }
  cooldown.add(message.author.id);
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args =  messageArray.slice(1);
    
    setTimeout(() => {
      cooldown.delete(message.author.id)
      }, cdseconds * 1000)

 if(cmd === `${prefix}present`){
    
  let attendanceEmbed = new Discord.RichEmbed()
  .setDescription("Attendance")
  .setColor("#15f153")
  .addField("Member Present", `${message.author}`)
  .addField("Time", message.createdAt)
  
  let attendancechannel = message.guild.channels.find(`name`, "union-attendance");
  if (!attendancechannel) return message.channel.send("Couldn't find attendance channel.");
  
  
  message.delete().catch(O_o=>{});
  attendancechannel.send(attendanceEmbed);
    
  }
    
});

bot.login(process.env.BOT_TOKEN);
