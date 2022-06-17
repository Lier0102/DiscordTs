import DJS, { Intents } from 'discord.js'
import WOK from 'wokcommands'
import path from 'path'
import 'dotenv/config'

const client = new DJS.Client({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
    ],
})

client.on('ready', () => {
    console.log('봇이 준비되었습니다.')

    let handler = require('./command-handler')
    if (handler.default) handler = handler.default

    handler(client)

    new WOK(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['984956876313739305'],
        botOwners: ['898341269389074533'],
    })
    .setDefaultPrefix('KWD!')
})

client.login(process.env.TOKEN)