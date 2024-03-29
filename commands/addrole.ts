import { Client, GuildMember, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: '역할 자동지급 메세지에 반응을 합니다.',

    permissions: ['ADMINISTRATOR'],

    minArgs: 3,
    maxArgs: 3,

    expectedArgs: '<채널> <메세지Id> <역할>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    init: (client: Client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu()) {
                return
            }

            const { customId, values, member } = interaction

            if (customId === 'auto_roles' && member instanceof GuildMember) {
                const components = interaction.component as MessageSelectMenu
                const removed = components.options.filter((option) => {
                    return !values.includes(option.value)
                })

                for (const id of removed) {
                    member.roles.remove(id.value)
                }

                for (const id of values) {
                    member.roles.add(id)
                }

                interaction.reply({
                    content: 'Roels upadte!',
                    ephemeral: true
                })
            }
        })
    },

    callback: async ({ message, interaction, args, client }) => {
        const channel = (
            message
            ? message.mentions.channels.first()
            : interaction.options.getChannel('channel')
        ) as TextChannel
        if(!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel.'
        }

        const messageId = args[1]

        const role = (message ? message.mentions.roles.first() : interaction.options.getRole('role')) as Role
        if (!role) {
            return 'Unkown role!'
        }

        const targetMessage = await channel.messages.fetch(messageId, {
            cache: true,
            force: true
        })

        if (!targetMessage) {
            return 'Unknown message Id'
        }

        if (targetMessage.author.id !== client.user?.id) {
            return `Please provide a message ID that was sent from <@${client.user?.id}>`
        }

        let row = targetMessage.components[0] as MessageActionRow
        if (!row) {
            row = new MessageActionRow()
        }

        const option: MessageSelectOptionData[] = [{
            label: role.name,
            value: role.id
        }]

        let menu = row.components[0] as MessageSelectMenu
        if (menu) {
            for (const o of menu.options) {
                if(o.value === option[0].value) {
                    return {
                        custom: true,
                        content: `<@&${o.value}> is already part of this menu.`,
                        ephemeral: true,
                        allowedMentions: {
                            roles: [],
                        }
                    }
                }
            }

            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new MessageSelectMenu()
                .setCustomId('auto_roles')
                .setMinValues(0)
                .setMaxValues(1)
                .setPlaceholder('Select your roles...')
                .addOptions(option)
            )
        }

        targetMessage.edit({
            components: [row]
        })

        return {
            custom: true,
            content: `Added <@&${role.id}> to the auto roles menu.`,
            allowedMentions: {
                roles: []
            },
            ephemeral: true,
        }
    },
} as ICommand