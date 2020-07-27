const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
client.commands = new Discord.Collection();
const Papa = require('./PapaParse-master/papaparse.min.js');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.once('ready', () => {
	console.log('Ready!');
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	//console.log(message.content);
	//if(!message.content.includes(prefix)){
		//console.log("NOOOOO")
	//}

	if (message.author.bot) return;

	fs.readFile('previousMessage.txt','utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

	if (message.content.toString().toLowerCase() === data.toString().toLowerCase()){
		message.channel.send(message.content.toString());
		fs.writeFile('previousMessage.txt', '123456489798456123186189135198416513987798231', function (err) {
		  if (err) throw err;
		  console.log('Wiped');
		});

	} else {
		fs.writeFile('previousMessage.txt', message.content.toString(), function (err) {
		  if (err) throw err;
		  console.log('Saved!');
		});
	}
  console.log(data);
});



	var fleetSpeedPrefix = "fleet speed = ";
	if (message.content.startsWith(fleetSpeedPrefix)){
		const args = message.content.slice(fleetSpeedPrefix.length).split(/ +/);
		console.log(args);
		var responses = ["<a:congaparrot:709442662230523917> BADDA BING BADDA BOOM! <a:congaparrot:709442662230523917>"];
		if(args[0] >= 150){
			message.channel.send(responses[0]);
		}

		return;
	}

  if (!message.content.startsWith(prefix)) return;

	//message.content = message.content.split(prefix)[];
	//console.log(message.content)
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	//console.log(args)
/*
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  var embed1 = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Welcome To Warp To Me Incursions')
    .setDescription('Rule #1 - Have fun and don\'t be a Dick!')
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
*/
  const msgStatusID = '707261995967315988';
  const msgWaitlistID = '707261996441010236';

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

/*  if (message.content === '!test') {
    message.channel.send(embed1);
    message.channel.send(embed2);
    message.channel.send(embed3);
  } else if(message.content === '!forming') {
    embed2 = new Discord.MessageEmbed()
      .setColor('#35ed0c')
      .setTitle('STATUS: Forming');
    embed3 = new Discord.MessageEmbed()
    	.setColor('#35ed0c')
    	.setTitle('WAITLIST: Open')
      .setURL('https://wl.warptome.net/')
    	.setTimestamp()
    	.setFooter('Last updated');
    message.channel.messages.fetch({around: msgStatusID, limit: 1})
      .then(messages => {
        messages.first().edit(embed2);
      });
    message.channel.messages.fetch({around: msgWaitlistID, limit: 1})
      .then(messages => {
        messages.first().edit(embed3);
      });
  } else if(message.content === '!running') {
    embed2 = new Discord.MessageEmbed()
      .setColor('#35ed0c')
      .setTitle('STATUS: Running');
    embed3 = new Discord.MessageEmbed()
    	.setColor('#35ed0c')
    	.setTitle('WAITLIST: Open')
      .setURL('https://wl.warptome.net/')
    	.setTimestamp()
    	.setFooter('Last updated');
    message.channel.messages.fetch({around: msgStatusID, limit: 1})
      .then(messages => {
        messages.first().edit(embed2);
      });
    message.channel.messages.fetch({around: msgWaitlistID, limit: 1})
      .then(messages => {
        messages.first().edit(embed3);
      });
  } else if(message.content === '!down') {
    embed2 = new Discord.MessageEmbed()
      .setColor('#ed0c2a')
      .setTitle('STATUS: Down');
    embed3 = new Discord.MessageEmbed()
    	.setColor('#ed0c2a')
    	.setTitle('WAITLIST: Closed')
      .setURL('https://wl.warptome.net/')
    	.setTimestamp()
    	.setFooter('Last updated');
    message.channel.messages.fetch({around: msgStatusID, limit: 1})
      .then(messages => {
        messages.first().edit(embed2);
      });
    message.channel.messages.fetch({around: msgWaitlistID, limit: 1})
      .then(messages => {
        messages.first().edit(embed3);
      });
  } else if (command === 'time') {
  	if (!args.length) {
  		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  	}

    try{
    	console.log(`Command name: ${command}\nArguments: ${args}`);
      var fs = require("fs");
      var text = fs.readFileSync("timezone.csv").toString();
			var state = 0;
      //var textByLine = text.split("\n");
      const csvData = Papa.parse(text, {header:true}).data

      function findOffsetByAchro(name) {
        return csvData.filter(data => data.abbreviation === name)[0].gmt_offset
      }

			var times = [];
			var utcDate = new Date();
			if(args[state].includes('/')){
				times = args[0].split('/');
				utcDate.setMonth(times[0]-1);
				utcDate.setDate(times[1]);
				state++;
			}
			if(args[state].includes(':')){
				times = `${args[state]}`.split(':');
			} else {
				times[0] = args[state].substring(0,2);
				times[1] = args[state].substring(2,4);
			}

			if(args[state+1].toUpperCase() === 'ET'){
				args[state+1] = 'UTC';
			}
			if(args[state+2].toUpperCase() === 'ET'){
				args[state+2] = 'UTC';
			}

			utcDate.setHours(times[0]);
			utcDate.setMinutes(times[1]);
			utcDate.setSeconds('0');

      var offsetMilliseconds = (+Math.abs(findOffsetByAchro(`${args[state+1]}`.toUpperCase())*1000)) + +(Math.abs(findOffsetByAchro(`${args[state+2]}`.toUpperCase())*1000));
      var outputDate;
			if(findOffsetByAchro(`${args[state+1]}`.toUpperCase()) - findOffsetByAchro(`${args[state+2]}`.toUpperCase()) < 0){
				outputDate = new Date(+utcDate.getTime() + +offsetMilliseconds);
			} else {
				outputDate = new Date(+utcDate.getTime() - +offsetMilliseconds);
			}
      console.log("output date coming up!")
      console.log(new Date(outputDate).toString());
			var output = utcDate.toString().split('GMT+0000 (Coordinated Universal Time)') + args[state+1].toUpperCase() + ' is ' + outputDate.toString().split('GMT+0000 (Coordinated Universal Time)') + args[state+2].toUpperCase();
			console.log(utcDate.getDay(4));
			output = output.split(',');
      message.channel.send(output[0] + output[1] + output[2]);
    } catch (err) {
      console.log(err.message);
      message.channel.send('Please use a valid format and/or timezone abbreviation')
    }
  }*/
});

client.login(token);
