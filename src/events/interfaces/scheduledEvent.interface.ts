import { EventEntityType } from "./eventEntityType.enum";

export interface ScheduledEvent {
    id: string;
    guildId: string;
    name: string;
    startTime: Date;
    endTime: Date;
    createdBy: string;
    threadId: string | null;
    threadMembers: string[];
    entityType: EventEntityType;
    location: string;
}