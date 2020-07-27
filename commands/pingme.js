module.exports = {
  name: 'pingme',
  description: 'Pings the user with an optional message attached',
  execute(message, args) {
    try{
      if(!args.length){
        return message.channel.send(`${message.author.toString()}`);
      } else {
        var append = message.toString().split("!pingme");
        return message.channel.send(`${message.author.toString()} ${append[1]}`);
      }
    } catch(err) {
      console.log(err.message);
      message.reply('I hate you all.')
    }
  }
}
