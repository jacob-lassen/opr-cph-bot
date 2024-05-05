import { Injectable } from "@nestjs/common";
import { DiscordHttpService } from "src/discord/services/discordHttp.service";

@Injectable()
export class ThreadMembersRepository {
    constructor(
        private readonly discordHttpService: DiscordHttpService,
    ) {}

    async addMember(channelId: number, memberId: number): Promise<void> {
        return this.discordHttpService.request({
            method: 'put',
            path: `/channels/${channelId}/thread-members/${memberId}`,
        });
    }
}