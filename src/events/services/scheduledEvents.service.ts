import { Injectable } from "@nestjs/common";
import { ThreadsService } from "src/threads/services/threads.service";
import { EventEntityType } from "../interfaces/eventEntityType.enum";
import { ScheduledEventsRepository } from "../repositories/scheduledEvents.repository";
import { ScheduledEvent } from "../interfaces/scheduledEvent.interface";
import { ThreadMembersService } from "src/threads/services/threadMembers.service";

@Injectable()
export class ScheduledEventsService {
    constructor(
        private readonly threadService: ThreadsService,
        private readonly threadMembersService: ThreadMembersService,
        private readonly scheduledEventsRepository: ScheduledEventsRepository,
    ) {}

    async initialize(event: ScheduledEvent): Promise<void> {
        if (event.entityType !== EventEntityType.EXTERNAL) {
            return;
        }

        // Make event link
        const inviteLink = `https://discord.com/events/${event.guildId}/${event.id}`;

        // Make thread
        const threadName = makeThreadName(event);
        const thread = await this.threadService.createThread(threadName, inviteLink);
        event.threadId = thread.id;

        // Save event
        await this.scheduledEventsRepository.saveEventCache(event);
    }

    async addMember(eventId: string, memberId: string): Promise<void> {
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
        this.threadMembersService.addMember(event.threadId, memberId);

        // Add to saved members list
        const threadMembers = event.threadMembers;
        threadMembers.push(memberId);
        this.scheduledEventsRepository.updateEvent(eventId, { threadMembers: threadMembers});
    }
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function makeThreadName(event: ScheduledEvent): string {
    const start = new Date(event.startTime);
    const month = start.toLocaleString('da-DK', { month: 'long' });
    const day = start.toLocaleString('da-DK', { day: 'numeric' }).replace(/\.$/, '');
    return `${month} ${day} (${event.name})`;
}