import { Module } from "@nestjs/common";
import { scheduledEventsController } from "./controllers/scheduledEvents.controller";

@Module({
    imports: [],
    controllers: [
        scheduledEventsController,
    ],
    providers: [],
    exports: []
})
export class EventsModule {}