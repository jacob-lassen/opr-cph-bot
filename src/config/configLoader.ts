import { ApplicationConfig } from "./interfaces/applicationConfig.interface";

let config: ApplicationConfig;

function getConfig() {
    if (!config) {
        throw new Error('Config not initialized');
    }
    return config;
}

function initConfig() {
    config = {
        discord: {
            token: process.env.DISCORD_TOKEN,
            guildId: process.env.GUILD_ID,
            generalChannelId: process.env.GENERAL_CHANNEL_ID,
            meetUpChannelId: process.env.MEET_UP_CHANNEL_ID,
        }
    }
}

export default {
    getConfig: getConfig,
    init: initConfig,
}