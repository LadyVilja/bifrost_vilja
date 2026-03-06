import { Client, EmbedBuilder, Message } from '@fluxerjs/core';
import FluxerCommandHandler from '../FluxerCommandHandler';
import { getHelpMessage } from '../../../commands/commandList';
import { defaultEmbedColor } from '../../../utils/embeds';

export default class HelpFluxerCommandHandler extends FluxerCommandHandler {
    constructor(client: Client) {
        super(client);
    }

    async handleCommand(message: Message, command: string, ...args: string[]): Promise<void> {
        await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Bifröst Help')
                    .setDescription(getHelpMessage('fluxer'))
                    .setColor(defaultEmbedColor),
            ],
        });
    }
}
