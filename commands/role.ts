import { ICommand } from "wokcommands";

const actions = ['give', 'remove', 'has']

export default {
    category: 'Configuration',
    description: '유저에게 역할을 지급/확인/제거합니다.',

    permissions: ['MANAGE_ROLES'],

    minArgs: 3,
    expectedArgs: `<"${actions.join('", "')}"> <유저 아이디> <역할 아이디>`,

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    options: [
        {
            name: 'action',
            description: `옵션이 누락되었습니다. 다음 중 하나의 옵션을 선택해주세요: ${actions.join(', ')}`,
            type: 'STRING',
            required: true,
            choices: actions.map((action) => ({
                name: action,
                value: action,
            })),
        },
        {
            name: 'user',
            description: `역할을 추가/제거/확인할 유저`,
            type: 'USER',
            required: true,
        },
        {
            name: 'role',
            description: `유저에게 줄/제거할/확인할 역할`,
            type: 'ROLE',
            required: true,
        },
    ],

    callback: ({ guild, args }) => {
        const action = args.shift()
        if (!action || !actions.includes(action)) {
            return `잘못된 행동입니다! 다음 중 하나를 이용해주세요: ${actions.join(
                ', '
            )}`
        }

      const memberId = args.shift()!.replace(/[<@!&>]/g, '')
      const roleId = args.shift()!.replace(/[<@!&>]/g, '')

      const member = guild!.members.cache.get(memberId)
      const role = guild!.roles.cache.get(roleId)

      if (!member) {
        return `해당 멤버의 아이디를 찾을 수 없습니다 : ${memberId}`
      }

      if (!role) {
        return `해당 역할의 아이디를 찾을 수 없습니다 ${roleId}`
      }

      if (action === 'has') {
        return member.roles.cache.has(roleId)
            ? '해당 유저가 해당 역할을 가지고 있습니다.'
            : '해당 유저가 해당 역할을 가지고 있지 않습니다.'
      }

      if (action === 'give') {
        member.roles.add(role)
        return `✅ **역할**이 ***지급***됬습니다.`
      }

      if (action === 'remove') {
        member.roles.remove(role)
        return `✅ **역할**이 ***제거***되었습니다.`
      }

      return '알 수 없는 오류!'
    },
} as ICommand