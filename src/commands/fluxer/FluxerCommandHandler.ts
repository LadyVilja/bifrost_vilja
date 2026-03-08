import { Client, GuildMember, Message, PermissionResolvable } from '@fluxerjs/core';
import CommandHandler from '../CommandHandler';
import logger from '../../utils/logging/logger';

export default abstract class FluxerCommandHandler extends CommandHandler<Client, Message> {
    protected async requirePermission(
        message: Message,
        permission: PermissionResolvable,
        permissionDisplayName?: string
    ): Promise<boolean> {
        let authorMember: GuildMember | null = null;
        try {
            authorMember = (await message.guild?.fetchMember(message.author.id)) || null;
        } catch (error) {
            logger.error(
                'Failed fetching member for Fluxer permission check',
                {
                    fluxerGuildId: message.guildId,
                    fluxerChannelId: message.channelId,
                    authorId: message.author.id,
                },
                error
            );
            await message.reply('Could not fetch your member information.');
            return false;
        }
        if (!authorMember) {
            await message.reply('Could not fetch your member information.');
            return false;
        }

        if (!authorMember.permissions.has(permission)) {
            const displayName = permissionDisplayName || permission;
            await message.reply(`You need the \`${displayName}\` permission to use this command.`);
            return false;
        }
        return true;
    }
}
