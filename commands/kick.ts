import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: '유저를 추방합니다.',

    permissions: ['ADMINISTRATOR'],

    slash: 'both',
    testOnly: false,

    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<유저> <이유>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({ message, interaction, args }) => {
        const target = message 
        ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if(!target) {
            return '추방할 사람을 지정해주세요.'
        }

        if(!target.kickable) {
            return {
                custom: true,
                content: '해당 유저는 추방이 불가합니다.',
                ephemeral: true
            }
        }

        args.shift()
        const reason = args.join(' ')

        target.kick(reason)

        return {
            custom: true,
            content: `<@${target.id}>를 추방했습니다.`,
            ephemral: true
        }
    }
} as ICommand