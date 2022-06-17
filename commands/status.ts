import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: '봇의 상태를 지정합니다',

    minArgs: 1,
    expectedArgs: '<상태>',

    slash: 'both',
    testOnly: false,
    ownerOnly: true,

    callback: ({ client, text }) => {
        client.user?.setPresence({
            status: 'dnd',
            activities: [
                {
                    name: text
                },
            ],
        })

        return '상태가 업데이트 되었습니다.'
    },
} as ICommand