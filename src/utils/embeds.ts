import { EmbedBuilder as DiscordEmbedBuilder, MessageReplyOptions } from 'discord.js';
import {
    EmbedBuilder as FluxerEmbedBuilder,
    MessageSendOptions,
    ReplyOptions,
} from '@fluxerjs/core';

export const defaultEmbedColor = 0x8338ec;
export const errorEmbedColor = 0xe53838;
export const successEmbedColor = 0x38e54d;

export const createDiscordErrorReply = (message: string, title?: string): MessageReplyOptions => {
    return {
        embeds: [
            new DiscordEmbedBuilder()
                .setTitle(title || 'Error')
                .setDescription(message)
                .setColor(errorEmbedColor),
        ],
    };
};

export const createFluxerErrorReply = (
    message: string,
    title?: string
): ReplyOptions & MessageSendOptions => {
    return {
        embeds: [
            new FluxerEmbedBuilder()
                .setTitle(title || 'Error')
                .setDescription(message)
                .setColor(errorEmbedColor),
        ],
    };
};

export const createDiscordSuccessReply = (message: string, title?: string): MessageReplyOptions => {
    return {
        embeds: [
            new DiscordEmbedBuilder()
                .setTitle(title || 'Success')
                .setDescription(message)
                .setColor(successEmbedColor),
        ],
    };
};

export const createFluxerSuccessReply = (
    message: string,
    title?: string
): ReplyOptions & MessageSendOptions => {
    return {
        embeds: [
            new FluxerEmbedBuilder()
                .setTitle(title || 'Success')
                .setDescription(message)
                .setColor(successEmbedColor),
        ],
    };
};
