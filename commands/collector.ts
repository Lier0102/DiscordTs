import { Message, MessageReaction, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: '테스트중',
    description: '콜렉터',

    callback: ({ message, channel }) => {
        message.reply('이 반응을 눌러주세요:')
        message.react('👍')

        // const filter = (m: Message) => {
        //     return m.author.id === message.author.id
        // }
        // const collector = channel.createMessageCollector({
        //     filter,
        //     max: 1,
        //     time: 1000 * 5
        // })

        const filter = (reaction: MessageReaction, user: User) => {
            return user.id === message.author.id
        }

        const collector = message.createReactionCollector({
            filter,
            max: 1,
            time: 1000 * 5
        })

        collector.on('collect', (reaction) => {
            console.log(reaction.emoji)
        })

        collector.on('end', collected => {
            if (collected.size === 0) {
                message.reply('5초안에 반응하지 않아 취소되었습니다.')
                return
            }

            let text = '콜렉트됨:\n\n'

            collected.forEach((message) => {
                text += `${message.emoji.name}\n`
            })

            message.reply(text)
        })
    }
} as ICommand