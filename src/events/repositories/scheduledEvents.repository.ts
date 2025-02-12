import { Injectable } from "@nestjs/common";
import { FileStoreService } from "src/fileStore/services/fileStore.service";
import { ScheduledEvent } from "../interfaces/scheduledEvent.interface";
import { DiscordConfig } from "src/config/interfaces/discordConfig.interface";
import { ConfigService } from "@nestjs/config";
import { DiscordHttpService } from "src/discord/services/discordHttp.service";

@Injectable()
export class ScheduledEventsRepository {
    constructor(
        private readonly configService: ConfigService,
        private readonly fileStoreService: FileStoreService,
        private readonly discordHttpService: DiscordHttpService,
    ) {}

    async createEvent(event: ScheduledEvent): Promise<ScheduledEvent> {
        const discordConfig: DiscordConfig = this.configService.get('discord');
        try {
            const response = await this.discordHttpService.request({
                method: 'post',
                path: `/guilds/${discordConfig.guildId}/scheduled-events`,
                data: {
                    name: event.name,
                    privacy_level: 2,
                    scheduled_start_time: event.startTime.toISOString(),
                    scheduled_end_time: event.endTime.toISOString(),
                    entity_type: event.entityType,
                    entity_metadata: {
                        location: event.location,
                    }
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
            return event;
        }
        return event;
    }

    async saveEventCache(event: ScheduledEvent): Promise<ScheduledEvent> {
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