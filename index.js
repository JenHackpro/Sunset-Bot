const discord = require('discord.js');
const client = new discord.Client();
const token = 'NjkyMzY1MjM5OTc0MzYzMTQ3.XntdcQ.RqfqPH2KCa95OckP77JG6qo8Kk8';
const moment = require("moment");

const PREFIX = '.';

client.on('ready', async () =>{
    console.log("This bot is online");
    client.user.setActivity("Sunset Development", { type: "WATCHING"}).catch(console.error)
})

client.on('message', msg=>{
    if(msg.content === "Hello"){
        msg.reply("Hello friends!, I'm Sunset bot and My dad is PainDev(JenusHams207)!")
    }
})

client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(channel => channel.name === "entrance");
    if(!channel) return;

    channel.send(`Welcome to our server, ${member}, please read the rules in the rules channel!`)
})

client.on("message", m =>{
    if(m.author.bot || !m.guild) return;
    if (!m.content.startsWith(PREFIX)) return;


    if(m.content.startsWith(PREFIX + "userinfo")) {
        let user = m.mentions.users.first() || m.author;
        let userinfo = {};
        userinfo.avatar = user.displayAvatarURL();
        userinfo.name = user.username;
        userinfo.discrim = `#${user.discriminator}`
        userinfo.id = user.id;
        userinfo.status = user.presence.status;

        

        const embed = new discord.MessageEmbed()
        .setAuthor(user.tag, userinfo.avatar)
        .setThumbnail(userinfo.avatar)
        .addField("Username:", userinfo.name, true)
        .addField("Discriminator:", userinfo.discrim, true)
        .addField("ID:", userinfo.id, true)
        .addField("Status:", userinfo.status, true)
        .addField("Joined At:", moment(m.guild.members.get(userinfo.id).joinedAt).format("MMMM Do YYYY, h:mm a"))
        .setTimestamp()

        return m.channel.send(embed);

     }
   
})


client.login(token);
