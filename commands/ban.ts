import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: '유저를 차단합니다.',

     permissions: ['ADMINISTRATOR'],
    // requireRoles: false,

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
            return '차단할 사람을 지정해주세요.'
        }

        if(!target.bannable) {
            return {
                custom: true,
                content: '해당 유저는 차단이 불가합니다.',
                ephemeral: true
            }
        }

        args.shift()
        const reason = args.join(' ')

        target.ban({
            reason,
            days: 7
        })

        return {
            custom: true,
            content: `<@${target.id}>가 차단되었습니다. ${target.user.username}의 최근 7일동안의 메시지가 삭제됩니다.`,
            ephemral: true
        }
    }
} as ICommand