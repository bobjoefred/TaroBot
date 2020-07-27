const Discord = require('discord.js');
const config = require('./../config.json');

module.exports = {
  name: 'running',
  description: 'Changes the motd to running',
  execute(message, args) {
    embed2 = new Discord.MessageEmbed()
      .setColor('#35ed0c')
      .setTitle('STATUS: Running');
    embed3 = new Discord.MessageEmbed()
    	.setColor('#35ed0c')
    	.setTitle('WAITLIST: Open')
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
