import { LinkService } from '../../../services/LinkService';
import DiscordCommandHandler, { DiscordCommandHandlerMessage } from '../DiscordCommandHandler';
import { Client, PermissionFlagsBits } from 'discord.js';
import logger from '../../../utils/logging/logger';
import { getDiscordCommandUsage } from '../../../commands/commandList';
import { createDiscordErrorReply, createDiscordSuccessReply } from '../../../utils/embeds';

export default class ChannelUnlinkDiscordCommandHandler extends DiscordCommandHandler {
    private readonly linkService: LinkService;

    constructor(client: Client, linkService: LinkService) {
        super(client);
        this.linkService = linkService;
    }

    public async handleCommand(
        message: DiscordCommandHandlerMessage,
        command: string,
        ...args: string[]
    ): Promise<void> {
        const hasPerms = await this.requirePermission(
            message,
            PermissionFlagsBits.ManageChannels,
            'Manage Channels'
        );
        if (!hasPerms) return;

        if (args.length > 0 && args[0].toLowerCase() === 'help') {
            const usage = getDiscordCommandUsage(command);
            await message.reply(usage);
            return;
        }

        try {
            await this.linkService.removeChannelLinkForDiscord(message.guildId!, message.channelId);
            await message.reply(
                createDiscordSuccessReply(`Successfully unlinked channel link.`, 'Channel Unlinked')
            );
        } catch (error: any) {
            await message.reply(
                createDiscordErrorReply(
                    'An error occurred while unlinking the channel: **' + error.message + '**' ||
                        'An error occurred while unlinking the channel.',
                    'Failed to Unlink Channel'
                )
            );
            logger.error(
                'Failed unlinking channel from Discord command',
                {
                    command,
                    discordGuildId: message.guildId,
                    discordChannelId: message.channelId,
                },
                error
            );
        }
    }
}
