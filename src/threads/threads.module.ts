import { Module } from "@nestjs/common";
import { ThreadsService } from "./services/threads.service";
import { threadsRepository } from "./repository/threads.repository";
import { ConfigModule } from "@nestjs/config";
import { DiscordModule } from "src/discord/discord.module";

@Module({
    imports: [
        ConfigModule,
        DiscordModule,
    ],
    controllers: [],
    providers: [
        ThreadsService,
        threadsRepository,
    ],
    exports: [ThreadsService]
})
export class ThreadsModule {}