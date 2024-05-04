import { Controller } from "@nestjs/common";
import { Pattern } from "src/discordStrategy/decorators/pattern.decorator";
import { GuildScheduleEventCreateDto } from "../dtos/guildScheduleEventCreate.dto";
import { ScheduledEventsService } from "../services/scheduledEvents.service";

@Controller()
export class scheduledEventsController {
    constructor(
        private readonly ScheduledEventsService: ScheduledEventsService
    ) {}

    @Pattern('GUILD_SCHEDULED_EVENT_CREATE')
    async onNewEvent(payload: GuildScheduleEventCreateDto) {
        this.ScheduledEventsService.initialize(payload);
        // ToDo stop accepting new event when error occurs
    }
}