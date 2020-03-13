import discord
import datetime
import pytz
import threading
import time
import requests
import urllib.request
from bs4 import BeautifulSoup
import config

incursionURL = "https://esi.evetech.net/latest/incursions/?datasource=tranquility"
universenamesURL = "https://esi.evetech.net/latest/universe/names/?datasource=tranquility"
eveuniURL = "https://wiki.eveuniversity.org/Constellation_layouts_for_Incursions"

class MyClient(discord.Client):
    async def on_ready(self):
        print('Logged on as', self.user)

    async def on_message(self, message):
        # don't respond to ourselves
        if message.author == self.user:
            return

        #special commands without prefix or suffix
        if('how to slack' in message.content):
            await message.channel.send('https://forums.warptome.net/topic/22-how-to-slack/')

        #special commands with prefix to be used within a message

        #slackbot like "xxx please" commands
        suffix = 'please'
        if(suffix in message.content):
            message.content = message.content.split("please")[0]
            message.content = message.content.replace(" ", "")

            #all commands must have no spaces
            #use shortest possible check i.e. meeting minutes please -> miniutes
            if('masterlist' in message.content):
                await message.channel.send('https://forums.warptome.net/topic/140-commander-information-list/')
            elif('tracker' in message.content):
                await message.channel.send('https://docs.google.com/spreadsheets/d/1NfM0mBBOD3QF5RsHWhQ7VycDtiMGYVDU0gUjZ-qyNpE/pubhtml')
            elif('signoffform' in message.content):
                await message.channel.send('https://forums.warptome.net/topic/571-sign-off-form/')
            elif('minutes' in message.content):
                await message.channel.send('https://drive.google.com/drive/folders/1vRqtWNG0ARlxkshQBSE86gNhCnZHMPdx?usp=sharing')
            elif('shadowlaunch' in message.content):
                await message.channel.send('https://eve-incursions.de/')
            elif('fedo' in message.content):
                await message.channel.send('http://gamma.feralfedo.com/')
            elif('shitlist' in message.content or 'sandbaglist' in message.content or 'sandbaggerlist'):
                await message.channel.send('https://docs.google.com/spreadsheets/d/1P6x7EhPDhN-bagfIsbv42FQbEFToayOFep5h3WwMf1M/edit?usp=sharing')
            elif('rnr' in message.content or 'r&r' in message.content):
                await message.channel.send('https://docs.google.com/document/d/1XF4ZjR_a_EeSkKqqBIRLOQVWfGZFaYPneLYzm062-h4/edit')
            elif('bylaws' in message.content):
                await message.channel.send('https://forums.warptome.net/topic/44-warp-to-me-bylaws/')
            elif('taggingguide' in message.content):
                await message.channel.send('https://docs.google.com/spreadsheets/d/1zPSoNN5v8h6HqNkhx-boUc2GQYClwXOUik3fNXs7LQo/pubhtml')
            elif('dotlan' in message.content):
                await message.channel.send('http://evemaps.dotlan.net/incursions')
            elif('forums' in message.content):
                await message.channel.send('https://forums.warptome.net')

        #checks for bot command prefix
        if '!' in message.content:
            #message.content = message.content[1:len(message.content)]
            message.content = message.content.split("!",1)[1]

            if message.content == 'ping':
                await message.channel.send('pong')
            elif message.content == 'help':
                await message.channel.send('```Bot is broken atm ;( Will be fixed soon tm\nAlso, forum feed integration is here!```')
            elif 'pingme' in message.content:
                message.content = message.content.split("pingme",1)[1]
                await message.channel.send('<@' + str(message.author.id) + '>' + message.content)
            elif 'utc' in message.content:
                await message.channel.send(pytz.utc.localize(datetime.datetime.utcnow()))
            elif message.content == 'sitedone':
                await message.channel.send('fml it doesn\'t work')
            elif message.content == 'incursions':
                # sending get request and saving the response as response object
                r = requests.get(url = incursionURL)

                # extracting data in json format
                data = r.json()

                idsearchstring = '[' + str(data[0]['constellation_id']) + ', ' + str(data[0]['infested_solar_systems'])[1:len(str(data[0]['infested_solar_systems']))-1] + ']'
                print(idsearchstring)

                r = requests.post(url = universenamesURL, data = idsearchstring)
                data = r.json()

                print(len(data))

                r = requests.get(eveuniURL)
                soup = BeautifulSoup(r.text, "html.parser")
                one_a_tag = soup.findAll('td')[32]
                print(one_a_tag)
            elif 'lmgtfy' in message.content:
                message.content = message.content.split("lmgtfy ",1)[1]
                message.content = message.content.replace(" ", "+")
                await message.channel.send('https://lmgtfy.com/?q=' + message.content)

client = MyClient()
client.run(config.token)
