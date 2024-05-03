import { Controller } from "@nestjs/common";
import { Pattern } from "src/discordStrategy/decorators/pattern.decorator";

@Controller()
export class scheduledEventsController {
    constructor() {}

    @Pattern('GUILD_SCHEDULED_EVENT_CREATE')
    async onNewEvent() {
        console.log('New event!')
    }
}