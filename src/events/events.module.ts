import { Module } from "@nestjs/common";
import { ScheduledEventsController } from "./controllers/scheduledEvents.controller";
import { ScheduledEventsService } from "./services/scheduledEvents.service";
import { ThreadsModule } from "src/threads/threads.module";
import { InvitesModule } from "src/invites/invites.module";
import { FileStoreModule } from "src/fileStore/fileStore.module";
import { ScheduledEventsRepository } from "./repositories/scheduledEvents.repository";

@Module({
    imports: [
        ThreadsModule,
        InvitesModule,
        FileStoreModule
    ],
    controllers: [
        ScheduledEventsController,
    ],
    providers: [
        ScheduledEventsService,
        ScheduledEventsRepository,
    ],
    exports: []
})
export class EventsModule {}