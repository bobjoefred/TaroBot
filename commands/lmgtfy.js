module.exports = {
  name: 'lmgtfy',
  description: 'Returns a lmgtfy link using the given string.',
  execute(message, args) {
    if (!args.length) {
  		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  	}

    try{
      var searchString = args[0];
      for(var i = 1; i < args.length; i++){
        searchString = searchString + "+" + args[i];
      }
      message.channel.send("https://lmgtfy.com/?q=" + searchString);
      console.log(`Command name: lmgtfy\nArguments: ${args}`);
    } catch(err) {
      console.log(err.message);
      message.reply(err.message)
    }
  }
}
