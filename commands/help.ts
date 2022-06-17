import 'discord.js'
import { 
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} from 'discord.js'
import { ICommand } from 'wokcommands'

export default {
    category: 'Configuration',
    description: '도움말 명령어',

    slash: false,
    testOnly: false,

    callback: async ({ message, text }) => {
        const embed = new MessageEmbed()
        .setTitle(`🔗 **여기서** 🔗`)
        .setColor('#0099ff')
        .setURL('https://discord.gg/uPdjufTa3J')
        .setDescription('확인가능합니다.😀')
        .setAuthor({name: 'MANAGE BOT의 도움말은', iconURL: 'https://blog.kakaocdn.net/dn/cEnttf/btrrsn84sOJ/JPP9LRgrLRbW1g1G6EK1w0/img.png'})
        .setFooter({ text: 'Made by 해커옆에서벨루가를외치는헬루가#1663', iconURL: 'https://cutewallpaper.org/download.php?file=/24/spy-silhouette-clip-art/2347724131.jpg' })
        
        const newMessage = await message.reply({
            embeds: [embed]
        })
    }
} as ICommand