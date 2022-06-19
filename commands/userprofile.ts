import DJS, { Message } from 'discord.js'
import { MessageEmbed, ReactionUserManager, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: '유저의 정보를 출력합니다.',

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    callback: async ({ user, message, text, interaction, channel }) => {

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

        if (!interaction) {
            channel.send({
                embeds: [embed]
            })
        }  

        if (interaction) {
            return embed
        }
    }

} as ICommand