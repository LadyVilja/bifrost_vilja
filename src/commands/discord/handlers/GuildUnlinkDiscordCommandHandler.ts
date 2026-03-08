import { LinkService } from '../../../services/LinkService';
import DiscordCommandHandler, { DiscordCommandHandlerMessage } from '../DiscordCommandHandler';
import { Client, PermissionFlagsBits } from 'discord.js';
import logger from '../../../utils/logging/logger';
import { getDiscordCommandUsage } from '../../../commands/commandList';
import { createDiscordErrorReply, createDiscordSuccessReply } from '../../../utils/embeds';

export default class GuildUnlinkDiscordCommandHandler extends DiscordCommandHandler {
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
        const discordGuildId = message.guildId!;

        const hasPerms = await this.requirePermission(
            message,
            PermissionFlagsBits.ManageGuild,
            'Manage Guild'
        );
        if (!hasPerms) return;

        if (args.length > 0 && args[0].toLowerCase() === 'help') {
            const usage = getDiscordCommandUsage(command);
            await message.reply(usage);
            return;
        }

        try {
            await this.linkService.removeGuildLinkFromDiscord(discordGuildId);
            await message.reply(
                createDiscordSuccessReply(
                    `Successfully unlinked this Discord guild from its linked Fluxer guild.`,
                    'Guild Unlinked'
                )
            );
        } catch (error: any) {
            await message.reply(
                createDiscordErrorReply(
                    `Failed to unlink guild: ${error.message}`,
                    'Error Unlinking Guild'
                )
            );
            logger.error(
                'Failed unlinking guild from Discord command',
                {
                    command,
                    discordGuildId,
                },
                error
            );
        }
    }
}
