import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: '여러개의 메세지를 한 번에 삭제합니다.',

    permissions: ['ADMINISTRATOR'],

    maxArgs: 1,
    expectedArgs: '[개수]',

    slash: 'both',
    testOnly: false,

    callback: async ({ message, interaction, channel, args }) => {
        // const amount = parseInt(args.shift()!)
        const amount = args.length ? parseInt(args.shift()!) : 10

        if (message) {
            await message.delete()
        }

        // Bulk Del
        const { size } = await channel.bulkDelete(amount, true)

        // Fetch and then del msg

        const reply = `Deleted ${size} message(s).`

        if (interaction) {
            return reply
        }

        channel.send(reply)
    }
} as ICommand