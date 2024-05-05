import { Injectable } from "@nestjs/common";
import { FileStoreService } from "src/fileStore/services/fileStore.service";
import { ScheduledEvent } from "../interfaces/scheduledEvent.interface";

@Injectable()
export class ScheduledEventsRepository {
    constructor(
        private readonly fileStoreService: FileStoreService,
    ) {}

    async createEvent(event: ScheduledEvent): Promise<ScheduledEvent> {
        this.fileStoreService.createFile(this.fileStoreService.fileStoreTypes.EVENT, event.id.toString(), event);
        return event;
    }

    async getEvent(id: number): Promise<ScheduledEvent> | null {
        const event = await this.fileStoreService.getFile(this.fileStoreService.fileStoreTypes.EVENT, id.toString());
        if (!event) {
            return null;
        }
        return event as ScheduledEvent;
    }

    async updateEvent(eventId: number, updates: Partial<ScheduledEvent>): Promise<ScheduledEvent> {
        const event = await this.fileStoreService.updateFile(this.fileStoreService.fileStoreTypes.EVENT, eventId.toString(), updates);
        return event as ScheduledEvent;
    }
}