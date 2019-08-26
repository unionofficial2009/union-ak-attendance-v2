const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
let cooldown = new Set();
let cdseconds = 86400;

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("!present for Attendance", {type: "WATCHING"});
  
});

bot.on("message", async message => {
//if(message.author.bot) return;
if(message.channel.type === "dm") return;
  
let prefix = botconfig.prefix;
  
if(!message.content.startsWith(prefix)) return;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args =  messageArray.slice(1);
    
 if(cmd === `${prefix}present`){
   
   if (message.channel.id != 498106235485421578 && message.author.id != 421634731709562886) {
     message.delete().catch(O_o=>{});
     return message.reply("Invalid Channel! Please type **!present** here :arrow_right: <#498106235485421578>");
   } 
   
   let today = new Date();
   let newtoday = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`;
   let curHr = today.getHours();
   let greetings = "";
   let myattendance = 0;
   
   if (curHr < 12) {
      greetings = 'Good Morning';
   } else if (curHr < 18) {
      greetings ='Good Afternoon';
   } else {
      greetings ='Good Evening';
   }
   
   let attendancechannel = message.guild.channels.find(`name`, "ls-attendance");
   if (!attendancechannel) return message.channel.send("Couldn't find attendance channel.");
   
   attendancechannel.fetchMessages({ limit: 100 })
   .then(messages => {
     
         
      messages.forEach(function(messagecontent,messageid) {
        

        let userdate = `${messagecontent.createdAt.getMonth()+1}-${messagecontent.createdAt.getDate()}-${messagecontent.createdAt.getFullYear()}`;
        
         if(message.author.bot){
        
         if(messagecontent.embeds[0].fields[0].value == message.author.username && newtoday == userdate){
          myattendance = myattendance + 1;
         }  
           
         } else {  
        
        if(messagecontent.embeds[0].fields[0].value == message.member.displayName && newtoday == userdate){
          myattendance = myattendance + 1;
        }  
       
        }   
           
     })  
     
     if (myattendance > 0){
       
          
         let romemberRole = message.guild.roles.find("name", "LS - Member"); 
       
        if(message.member.roles.has(romemberRole.id)) {
           message.reply("You already have attendance for today.")  
        } else {
          message.reply("You don't have the permission to use this command."); 
        }
                   
       
           
     }  else {
       
         
      let romemberRole = message.guild.roles.find("name", "LS - Member");  
      if(message.member.roles.has(romemberRole.id)) {
      
      message.reply(`${greetings} ${message.member.displayName}  :tada::hugging: !`);  
        
     let c_user = message.author   
     let bicon = c_user.displayAvatarURL;   
     let bicon2 = bot.user.displayAvatarURL;   
     
     let attendanceEmbed = new Discord.RichEmbed()
     .setDescription(`${message.author}`)
     .addField("Display Name", `${message.member.displayName}`)
     .addField("Username", `${message.author.username}`)
     .addField("Tag", `${message.author.tag}`)
     .addField("ID", `${message.author.id}`)
     .setColor("#15f153")
     .setThumbnail(bicon)
     .addField("Attendance", "Present")
     .setTimestamp()
     .setFooter("UNION LS Attendance",bicon2);
     
     let attendancechannel = message.guild.channels.find(`name`, "ls-attendance");
     if (!attendancechannel) return message.channel.send("Couldn't find attendance channel.");   
        
     attendancechannel.send(attendanceEmbed);   
        
      } else {
      message.reply("You don't have the permission to use this command.");
          
      }           
         
        
       
     }  
       
    message.delete().catch(O_o=>{});   
   }).catch(console.error);
  
  }
  
  if(cmd === `${prefix}botinfo`){
   
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("Bot Information")
  .setColor("#15f153")
  .setThumbnail(bicon)
  .addField("Bot Name", bot.user.username);
   
  return message.channel.send(botembed);
}
    
});


bot.login(process.env.BOT_TOKEN);
