import { Client, GuildMember, Message, PermissionFlags } from '@fluxerjs/core';
import { LinkService } from '../../../services/LinkService';
import FluxerCommandHandler from '../FluxerCommandHandler';
import logger from '../../../utils/logging/logger';
import { getFluxerCommandUsage } from '../../../commands/commandList';
import { createFluxerErrorReply, createFluxerSuccessReply } from '../../../utils/embeds';

export default class ChannelUnlinkFluxerCommandHandler extends FluxerCommandHandler {
    private readonly linkService: LinkService;

    constructor(client: Client, linkService: LinkService) {
        super(client);
        this.linkService = linkService;
    }

    public async handleCommand(
        message: Message,
        command: string,
        ...args: string[]
    ): Promise<void> {
        const hasPerms = await this.requirePermission(
            message,
            PermissionFlags.ManageChannels,
            'Manage Channels'
        );
        if (!hasPerms) return;

        if (args.length > 0 && args[0].toLowerCase() === 'help') {
            const usage = getFluxerCommandUsage(command);
            await message.reply(usage);
            return;
        }

        try {
            await this.linkService.removeChannelLinkForFluxer(message.guildId!, message.channelId);
            await message.reply(
                createFluxerSuccessReply(`Successfully unlinked channel link.`, 'Channel Unlinked')
            );
        } catch (error: any) {
            await message.reply(
                createFluxerErrorReply(
                    'An error occurred while unlinking the channel: ' + error.message ||
                        'An error occurred while unlinking the channel.',
                    'Failed to Unlink Channel'
                )
            );
            logger.error(
                'Failed unlinking channel from Fluxer command',
                {
                    command,
                    fluxerGuildId: message.guildId,
                    fluxerChannelId: message.channelId,
                },
                error
            );
        }
    }
}
