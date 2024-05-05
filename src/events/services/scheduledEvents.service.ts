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

    async initialize(event: ScheduledEvent): Promise<void> {
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

    async addMember(eventId: number, memberId: number): Promise<void> {
        let event: ScheduledEvent;
        event = await this.scheduledEventsRepository.getEvent(eventId);
        if (!event) {
            await delay(3000);
            event = await this.scheduledEventsRepository.getEvent(eventId);
        }

        if (!event) {
            return;
        }

        // Add member to thread
        // ToDo Channelservice.addMember(channelId, memberId);
        const threadMembers = event.threadMembers;
        threadMembers.push(memberId);
        this.scheduledEventsRepository.updateEvent(eventId, { threadMembers: threadMembers});
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function makeThreadName(event: ScheduledEvent) {
    const start = new Date(event.startTime);
    const month = start.toLocaleString('da-DK', { month: 'long' });
    const day = start.toLocaleString('da-DK', { day: 'numeric' }).replace(/\.$/, '');
    return `${month} ${day} (${event.name})`;
}