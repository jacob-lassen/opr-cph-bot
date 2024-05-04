import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

interface RequestOptions {
    path: string;
    method: string;
    data?: any;
}

interface discordHttpOptions {
    url: string;
    method: string;
    headers: {
        Authorization: string;
    };
    data?: any;

}

const discordUrl = 'https://discord.com/api';

@Injectable()
export class DiscordHttpService {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    async request({ path, method, data }: RequestOptions) {
        const discordConfig = this.configService.get('discord');
        const options: discordHttpOptions = {
            method: method,
            url: `${discordUrl}${prefixWithSlash(path)}`,
            headers: {
                'Authorization': `Bot ${discordConfig.token}`,
            },
        };
        if (data) {
            options.data = data;
        }

        const promise = axios(options);
        const [result] = await Promise.allSettled([promise]);

        if (result.status === 'rejected') {
            throw new Error(result.reason);
        }

        return result.value.data;
    }
}

function prefixWithSlash(path) {
    if (!path.startsWith('/')) {
        return `/${path}`;
    }
    return path;
}