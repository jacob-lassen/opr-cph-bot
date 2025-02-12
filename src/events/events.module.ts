import { Module } from "@nestjs/common";
import { ScheduledEventsController } from "./controllers/scheduledEvents.controller";
import { ScheduledEventsService } from "./services/scheduledEvents.service";
import { ThreadsModule } from "src/threads/threads.module";
import { InvitesModule } from "src/invites/invites.module";
import { FileStoreModule } from "src/fileStore/fileStore.module";
import { ScheduledEventsRepository } from "./repositories/scheduledEvents.repository";
import { ScheduleEventsJob } from "./jobs/scheduleEvents.job";
import { ScheduleRepository } from "./repositories/schedule.repository";
import { ConfigModule } from "@nestjs/config";
import { DiscordModule } from "src/discord/discord.module";

@Module({
    imports: [
        ThreadsModule,
        InvitesModule,
        FileStoreModule,
        ConfigModule,
        DiscordModule,
    ],
    controllers: [
        ScheduledEventsController,
    ],
    providers: [
        ScheduledEventsService,
        ScheduledEventsRepository,
        ScheduleEventsJob,
        ScheduleRepository,
    ],
    exports: []
})
export class EventsModule {}