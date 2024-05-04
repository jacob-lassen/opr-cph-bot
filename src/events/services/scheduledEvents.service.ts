import { Injectable } from "@nestjs/common";
import { GuildScheduleEventCreateDto } from "../dtos/guildScheduleEventCreate.dto";
import { ThreadsService } from "src/threads/services/threads.service";
import { EventEntityType } from "../interfaces/eventEntityType.enum";
import { InvitesRepository } from "src/invites/repositories/invites.repository";
import { invitesService } from "src/invites/services/invites.service";

@Injectable()
export class ScheduledEventsService {
    constructor(
        private readonly threadService: ThreadsService,
        private readonly inviteService: invitesService,
    ) {}

    async initialize(event: GuildScheduleEventCreateDto) {
        if (event.entity_type !== EventEntityType.EXTERNAL) {
            return;
        }

        // Make invite link
        const expiresAt = new Date(event.scheduled_start_time);
        const invite = await this.inviteService.createInvite(expiresAt);
        const inviteLink = `https://discord.gg/${invite.code}?event=${event.id}`;

        // Make thread
        const threadName = makeThreadName(event);
        await this.threadService.createThread(threadName, inviteLink);
    }
}

function makeThreadName(event: GuildScheduleEventCreateDto) {
    const start = new Date(event.scheduled_start_time);
    const month = start.toLocaleString('da-DK', { month: 'long' });
    const day = start.toLocaleString('da-DK', { day: 'numeric' }).replace(/\.$/, '');
    return `${month} ${day} (${event.name})`;
}