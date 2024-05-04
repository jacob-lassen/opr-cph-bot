import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DiscordConfig } from "src/config/interfaces/discordConfig.interface";
import { DiscordHttpService } from "src/discord/services/discordHttp.service";

@Injectable()
export class threadsRepository {
    constructor(
        private readonly configService: ConfigService,
        private readonly discordHttpService: DiscordHttpService,
    ) {}

    async createThread(threadName: string, message: string) {
        const discordConfig: DiscordConfig = this.configService.get('discord');
        return this.discordHttpService.request({
            method: 'post',
            path: `/channels/${discordConfig.meetUpChannelId}/threads`,
            data: {
                name: threadName,
                auto_archive_duration: 4320,
                message: {
                    content: message
                }
            }
        });
    }
}