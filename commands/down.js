const Discord = require('discord.js');
const config = require('./../config.json');

module.exports = {
  name: 'down',
  description: 'Changes the motd to down',
  execute(message, args) {
    var embed2 = new Discord.MessageEmbed()
      .setColor('#ed0c2a')
      .setTitle('STATUS: Down');
    var embed3 = new Discord.MessageEmbed()
    	.setColor('#ed0c2a')
    	.setTitle('WAITLIST: Closed')
      .setURL('https://wl.warptome.net/')
    	.setTimestamp()
    	.setFooter('Last updated');
    message.channel.messages.fetch({around: config.motdStatusID, limit: 1})
      .then(messages => {
        messages.first().edit(embed2);
      });
    message.channel.messages.fetch({around: config.motdWaitlistID, limit: 1})
      .then(messages => {
        messages.first().edit(embed3);
      });
  }
}
