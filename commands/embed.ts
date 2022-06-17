import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: '테스트중',
    description: '임베드전송(값 입력 필요)',

    slash: false,
    testOnly: false,

    permissions: ['ADMINISTRATOR'],

    callback: async ({ message, text }) => {// 여기부터
        const json = JSON.parse(text)

        const embed = new MessageEmbed(json)

        return embed

    //     const embed = new MessageEmbed()
    //     .setDescription("Hello World")
    //     .setTitle("Title")
    //     .setColor("RED")
    //     .setAuthor("Juwon")
    //     .setFooter('footer')
    //     .addFields([
    //         {
    //             name: 'name',
    //             value: 'value',
    //             inline: true,
    //         },
    //         {
    //             name: 'name two',
    //             value: 'value two',
    //             inline: true,
    //         },
    //     ])
    //     .addField('name three', 'value three')

        // const newMessage = await message.reply({
        //     embeds: [embed]
        // })
        
    //     await new Promise(resolve => setTimeout(resolve, 5000))

    //     const newEmbed = newMessage.embeds[0]
    //     newEmbed.setTitle('Edited Title')

    //     newMessage.edit({
    //         embeds: [newEmbed],
    //     })
    },// 여기까지 주석 ㄱㄴ
} as ICommand
