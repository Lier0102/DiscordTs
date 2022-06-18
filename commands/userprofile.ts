import DJS from 'discord.js'
import { MessageEmbed, ReactionUserManager, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: '유저의 정보를 출력합니다.',

    minArgs: 1,
    maxArgs: 1,

    expectedArgs: '<해당유저Id>',
    expectedArgsTypes: ['USER'],

    slash: false,
    testOnly: true,
    guildOnly: true,

    callback: async ({ user, message, text }) => {

        const embed = new MessageEmbed({
            color: "BLUE",
            image: {
                url: `${user.displayAvatarURL({ dynamic: true })}`
            },
            author: {
                name: user.tag,
                iconURL: user.displayAvatarURL({ dynamic: true })
            },
            thumbnail: {
                url: user.displayAvatarURL({ dynamic: true })
            },
            description: [
                `이름: ${user.username}`,
                `태그: #${user.discriminator}`,
                `가입날짜: ${user.createdAt}`

            ].join('\n')
        });

        const newMessage = await message.reply({
            embeds: [embed]
        })
    }

} as ICommand