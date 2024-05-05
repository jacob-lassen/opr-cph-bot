import { Module } from "@nestjs/common";
import { ThreadsService } from "./services/threads.service";
import { threadsRepository } from "./repository/threads.repository";
import { ConfigModule } from "@nestjs/config";
import { DiscordModule } from "src/discord/discord.module";
import { ThreadMembersService } from "./services/threadMembers.service";
import { ThreadMembersRepository } from "./repository/threadMembers.repository";

@Module({
    imports: [
        ConfigModule,
        DiscordModule,
    ],
    controllers: [],
    providers: [
        ThreadsService,
        ThreadMembersService,
        threadsRepository,
        ThreadMembersRepository,
    ],
    exports: [
        ThreadsService,
        ThreadMembersService,
    ]
})
export class ThreadsModule {}