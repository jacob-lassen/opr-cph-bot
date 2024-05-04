import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DiscordHttpService } from "src/discord/services/discordHttp.service";

@Injectable()
export class InvitesRepository {
    constructor(
        private readonly discordHttpService: DiscordHttpService,
        private readonly configService: ConfigService,
    ) {}
    // ToDo add response type
    async createInvite(expiresAt: Date) {
        const discordConfig = this.configService.get('discord');
        const invite = await this.discordHttpService.request({
            method: 'post',
            path: `/channels/${discordConfig.generalChannelId}/invites`,
            data: {
                expires_at: expiresAt.toISOString(),
            }
        });
        return invite;
    }
}