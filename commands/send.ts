import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Sends a message.',

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<채널> <문자>',
    expectedArgsTypes: ['CHANNEl', 'STRING'],

    slash:  false,
    testOnly: false,
    guildOnly: true,

    callback: ({ message, interaction, args }) => {
        const channel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel')) as TextChannel

        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel.'
        }

        args.shift()
        const text = args.join(' ')

        message.channel.send(text)

        if (interaction) {
            interaction.reply({
                content: 'Send message!',
                ephemeral: true,
            })
        }
    }
} as ICommand