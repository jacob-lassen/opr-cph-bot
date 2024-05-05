import { Injectable } from "@nestjs/common";
import { FileStoreService } from "src/fileStore/services/fileStore.service";
import { ScheduledEvent } from "../interfaces/scheduledEvent.interface";

@Injectable()
export class ScheduledEventsRepository {
    constructor(
        private readonly fileStoreService: FileStoreService,
    ) {}

    async createEvent(event: ScheduledEvent) {
        this.fileStoreService.createFile(this.fileStoreService.fileStoreTypes.EVENT, event.id.toString(), JSON.stringify(event));
    }
}