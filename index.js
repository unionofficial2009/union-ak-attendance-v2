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
  
let prefix = botconfig.prefix;
  
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args =  messageArray.slice(1);  

 if(cmd === `${prefix}present`){
   
   let akmemberRole = message.guild.roles.find("name", "AK - Member");
   
   if(message.member.roles.has(akmemberRole.id)) {
   
    let c_user = message.author   
    let bicon = c_user.displayAvatarURL;  
    let bicon2 = bot.user.displayAvatarURL;
   
     let attendanceEmbed = new Discord.RichEmbed()
    .setDescription(`${message.author}`)
    .addField("Username", `${message.author.username}`)
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Attendance", "Present")
    .setTimestamp()
    .setFooter("UNION AK Attendance",bicon2);
     
     let attendancechannel = message.guild.channels.find(`name`, "ak-attendance");
     if (!attendancechannel) return message.channel.send("Couldn't find attendance channel.");
     
   } else {
    message.reply(`you don't have the permission to use this command.`);    
   }  
   
 }  
  
});



bot.login(process.env.BOT_TOKEN);
