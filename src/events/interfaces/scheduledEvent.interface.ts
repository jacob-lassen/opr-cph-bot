import { EventEntityType } from "./eventEntityType.enum";

export interface ScheduledEvent {
    id: number;
    name: string;
    startTime: Date;
    endTime: Date;
    createdBy: number;
    threadId: number | null;
    threadMembers: number[];
    entityType: EventEntityType;
}