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
        }
    }
}

export default {
    getConfig: getConfig,
    init: initConfig,
}