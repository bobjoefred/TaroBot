const Discord = require('discord.js');
const config = require('./../config.json');
const bot = require('./../bot.js');

module.exports = {
  name: 'forming',
  description: 'Changes the motd to forming',
  execute(message, args) {
    var client = bot.client;
    embed2 = new Discord.MessageEmbed()
      .setColor('#35ed0c')
      .setTitle('STATUS: Forming');
    embed3 = new Discord.MessageEmbed()
    	.setColor('#35ed0c')
    	.setTitle('WAITLIST: Open')
      .setURL('https://wl.warptome.net/')
    	.setTimestamp()
    	.setFooter('Last updated');
    message.channel.messages.fetch('709216635285667861').editMessage('asdfasdf');
    /*message.channel.messages.fetch(config.motdStatusID)
      .then(message => console.log(message.content))
      .catch(console.error);
    message.channel.messages.fetch(config.motdWaitlistID)
      .then(message => console.log(message.content))
      .catch(console.error);*/
  }
}
