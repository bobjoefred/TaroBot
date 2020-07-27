const Papa = require('./../PapaParse-master/papaparse.min.js');

module.exports = {
  name: 'time',
  description: 'Converts a given time or date and time from one timezone to another\n`MM/DD XX:YY TMZ1 TMZ2` or `XX:YY TMZ1 TMZ2`',
  execute(message, args) {
    var utcDate = new Date();
    if (!args.length) {
  		return message.channel.send(utcDate.toUTCString());
  	}

    try{
      var fs = require("fs");
      var text = fs.readFileSync("timezone.csv").toString();
			var state = 0;
      const csvData = Papa.parse(text, {header:true}).data

      function findOffsetByAchro(name) {
        return csvData.filter(data => data.abbreviation === name)[0].gmt_offset
      }

			var times = [];
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
			var output = utcDate.toString().split('GMT+0000 (Coordinated Universal Time)') + args[state+1].toUpperCase() + ' is ' + outputDate.toString().split('GMT+0000 (Coordinated Universal Time)') + args[state+2].toUpperCase();
			output = output.split(',');
      message.channel.send(output[0] + output[1] + output[2]);
    } catch (err) {
      console.log(err.message);
      message.reply('Please use a valid format and/or timezone abbreviation. !help time for more info')
    }
  }
}
