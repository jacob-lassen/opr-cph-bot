import { Injectable } from "@nestjs/common";
import { DiscordHttpService } from "src/discord/services/discordHttp.service";

@Injectable()
export class MessageRepository {
    constructor(
        private readonly discordHttpService: DiscordHttpService
        ,
    ) {}

    async sendMessage(message: string, channelId): Promise<void> {
        await this.discordHttpService.request({
            method: 'post',
            path: `/channels/${channelId}/messages`,
            data: {
                content: message,
            },
        });
    }
}