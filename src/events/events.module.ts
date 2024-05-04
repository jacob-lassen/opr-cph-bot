import { Module } from "@nestjs/common";
import { scheduledEventsController } from "./controllers/scheduledEvents.controller";
import { ScheduledEventsService } from "./services/scheduledEvents.service";
import { ThreadsModule } from "src/threads/threads.module";
import { InvitesModule } from "src/invites/invites.module";

@Module({
    imports: [
        ThreadsModule,
        InvitesModule,
    ],
    controllers: [
        scheduledEventsController,
    ],
    providers: [ScheduledEventsService],
    exports: []
})
export class EventsModule {}