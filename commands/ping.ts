import { ICommand } from "wokcommands";

export default {
    category: '테스트중',
    description: '퐁이라고 대답',

    slash: 'both',
    testOnly: false,

    callback: ({}) => {
        return '퐁'
    },
} as ICommand