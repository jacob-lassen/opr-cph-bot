import { Controller } from "@nestjs/common";
import { Pattern } from "src/discordStrategy/decorators/pattern.decorator";
import { GuildScheduleEventCreateDto } from "../dtos/guildScheduleEventCreate.dto";
import { ScheduledEventsService } from "../services/scheduledEvents.service";
import { ScheduledEvent } from "../interfaces/scheduledEvent.interface";
import { guildScheduledEventUserAddDto } from "../dtos/guildScheduledEventUserAdd.dto";

@Controller()
export class ScheduledEventsController {
    constructor(
        private readonly ScheduledEventsService: ScheduledEventsService
    ) {}

    @Pattern('GUILD_SCHEDULED_EVENT_CREATE')
    async onNewEvent(payload: GuildScheduleEventCreateDto) {
        const event: ScheduledEvent = {
            id: payload.id,
            entityType: payload.entity_type,
            name: payload.name,
            startTime: new Date(payload.scheduled_start_time),
            endTime: new Date(payload.scheduled_end_time),
            createdBy: payload.creator_id,
            threadId: null,
            threadMembers: [],
        }
        this.ScheduledEventsService.initialize(event);
    }

    @Pattern('GUILD_SCHEDULED_EVENT_USER_ADD')
    async onUserAdd(payload: guildScheduledEventUserAddDto) {
        this.ScheduledEventsService.addMember(payload.guild_scheduled_event_id, payload.user_id);
    }
}