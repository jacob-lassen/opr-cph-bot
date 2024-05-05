import { Injectable } from "@nestjs/common";
import { ThreadsService } from "src/threads/services/threads.service";
import { EventEntityType } from "../interfaces/eventEntityType.enum";
import { invitesService } from "src/invites/services/invites.service";
import { ScheduledEventsRepository } from "../repositories/scheduledEvents.repository";
import { ScheduledEvent } from "../interfaces/scheduledEvent.interface";

@Injectable()
export class ScheduledEventsService {
    constructor(
        private readonly threadService: ThreadsService,
        private readonly inviteService: invitesService,
        private readonly scheduledEventsRepository: ScheduledEventsRepository,
    ) {}

    async initialize(event: ScheduledEvent) {
        if (event.entityType !== EventEntityType.EXTERNAL) {
            return;
        }

        // Make invite link
        const expiresAt = new Date(event.startTime);
        const invite = await this.inviteService.createInvite(expiresAt);
        const inviteLink = `https://discord.gg/${invite.code}?event=${event.id}`;

        // Make thread
        const threadName = makeThreadName(event);
        await this.threadService.createThread(threadName, inviteLink);

        await this.scheduledEventsRepository.createEvent(event);
    }
}

function makeThreadName(event: ScheduledEvent) {
    const start = new Date(event.startTime);
    const month = start.toLocaleString('da-DK', { month: 'long' });
    const day = start.toLocaleString('da-DK', { day: 'numeric' }).replace(/\.$/, '');
    return `${month} ${day} (${event.name})`;
}