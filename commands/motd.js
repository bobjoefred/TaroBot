const Discord = require('discord.js');

module.exports = {
  name: 'motd',
  description: 'Creates a blank motd in the current channel',
  execute(message, args) {

    var embed1 = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Welcome To Warp To Me Incursions')
      .setDescription('Rule #1 - Have fun and don\'t be a Dick!\nAll new pilots joining our Discord will have to wait a few minutes before being able to read or chat in the server.')
      .addFields(
        {
          name: "Forums",
          value: "[WTM Forums](http://forums.warptome.net/)"
        },
        {
          name: "Fittings",
          value: "[WTM Fittings](https://wl.warptome.net/fits/)"
        },
        {
          name: "Rookie Guide",
          value: "[WTM Rookie Guide](https://forums.warptome.net/topic/301-rookie-guide/)"
        },
      )
      .setTimestamp()
      .setFooter('Last updated');

    var embed2 = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('STATUS: Down');

    var embed3 = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('WAITLIST: Closed')
      .setURL('https://wl.warptome.net/')
      .setTimestamp()
      .setFooter('Last updated');

    message.channel.send(embed1);
    message.channel.send(embed2);
    message.channel.send(embed3);
  }
}
