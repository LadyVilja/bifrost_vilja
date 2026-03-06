import { Client, Message, PermissionFlags } from '@fluxerjs/core';
import { LinkService } from '../../../services/LinkService';
import FluxerCommandHandler from '../FluxerCommandHandler';
import logger from '../../../utils/logging/logger';
import { getFluxerCommandUsage } from '../../../commands/commandList';
import { createFluxerErrorReply, createFluxerSuccessReply } from '../../../utils/embeds';

export default class GuildUnlinkFluxerCommandHandler extends FluxerCommandHandler {
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
        const fluxerGuildId = message.guildId!;

        const hasPerms = await this.requirePermission(
            message,
            PermissionFlags.ManageGuild,
            'Manage Guild'
        );
        if (!hasPerms) return;

        if (args.length > 0 && args[0].toLowerCase() === 'help') {
            const usage = getFluxerCommandUsage(command);
            await message.reply(usage);
            return;
        }

        try {
            await this.linkService.removeGuildLinkFromFluxer(fluxerGuildId);
            await message.reply(
                createFluxerSuccessReply(
                    `Successfully unlinked this Fluxer guild from its linked Discord guild.`,
                    'Guild Unlinked'
                )
            );
        } catch (error: any) {
            await message.reply(
                createFluxerErrorReply(
                    `Failed to unlink guild: ${error.message}`,
                    'Error Unlinking Guild'
                )
            );
            logger.error('Error unlinking guild:', error);
        }
    }
}
