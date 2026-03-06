import { Client, EmbedBuilder } from 'discord.js';
import DiscordCommandHandler, { DiscordCommandHandlerMessage } from '../DiscordCommandHandler';
import { getHelpMessage } from '../../../commands/commandList';
import { defaultEmbedColor } from '../../../utils/embeds';

export default class HelpDiscordCommandHandler extends DiscordCommandHandler {
    constructor(client: Client) {
        super(client);
    }

    async handleCommand(
        message: DiscordCommandHandlerMessage,
        command: string,
        ...args: string[]
    ): Promise<void> {
        await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Bifröst Help')
                    .setDescription(getHelpMessage('discord'))
                    .setColor(defaultEmbedColor),
            ],
        });
    }
}
