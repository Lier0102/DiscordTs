import { ICommand } from "wokcommands";
import { DiscordMessage, DiscordUser, DiscordEmbed, DiscordInteraction, DiscordMessageReactionAdd, DiscordMessageActionRow, DiscordMessageButton, DiscordButtonStyle, DiscordSelectMenu, DiscordSelectOption } from 'discord-minimal';

const WIDTH = 9;
const HEIGHT = 8;

export default {
    category: 'Game',
    description: '지뢰찾기 게임을 플레이합니다.',

    slash: false,
    testOnly: true,
    guildOnly: true,

    
} as ICommand