import { ICommand } from "wokcommands";

export default {
    category: 'Moderation', // 도움말에 표시될 카테고리 명
    description: '여러개의 메세지를 한 번에 삭제합니다.',
    // 도움말에 표시될 설명란
    permissions: ['ADMINISTRATOR'],
    // 필요권한, requirerole: true로 해도 되지만
    // 예상치 못한 오류로 임시로 저 구문을 쓰게 됨

    maxArgs: 1,// 최대로 필요한 인자(arguments)
    expectedArgs: '[개수]',// 필요한 인자의 타입

    slash: 'both',// 앱 커맨드와 봇 커맨드 동시 지원
    testOnly: false,// 테스트를 완료해서 테스트 값을 끔

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
