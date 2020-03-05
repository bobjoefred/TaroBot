import discord
import datetime
import pytz
import threading

import config


class MyClient(discord.Client):
    async def on_ready(self):
        print('Logged on as', self.user)

    async def on_message(self, message):
        # don't respond to ourselves
        if message.author == self.user:
            return

        #checks for bot command prefix
        if message.content[0:1] == '!':
            message.content = message.content[1:len(message.content)]

            if message.content == 'ping':
                await message.channel.send('pong')
            elif message.content == 'help':
                await message.channel.send('```Bot is broken atm ;( Will be fixed soon tm```')
            elif message.content == 'pingme':
                await message.channel.send('<@' + str(message.author.id) + '>')
            elif message.content == 'utc':
                await message.channel.send(pytz.utc.localize(datetime.datetime.utcnow()))
            elif message.content == 'sitedone':
                timer = threading.Timer(2.0, await message.channel.send('yeet'))
                timer.start()

client = MyClient()
client.run(config.token)
