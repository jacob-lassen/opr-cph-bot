import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DiscordHttpService } from "src/discord/services/discordHttp.service";

const sevenDaysInSeconds = 604800;

@Injectable()
export class InvitesRepository {
    constructor(
        private readonly discordHttpService: DiscordHttpService,
        private readonly configService: ConfigService,
    ) {}
    // ToDo add response type
    async createInvite() {
        const discordConfig = this.configService.get('discord');
        const invite = await this.discordHttpService.request({
            method: 'post',
            path: `/channels/${discordConfig.generalChannelId}/invites`,
            data: {
                max_age: sevenDaysInSeconds,
            }
        });
        return invite;
    }
}