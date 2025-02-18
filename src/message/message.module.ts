import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MessageRepository } from "./repositories/message.repository";
import { DiscordModule } from "src/discord/discord.module";

@Module({
    imports: [
        ConfigModule,
        DiscordModule,
    ],
    controllers: [],
    providers: [
        MessageRepository,
    ],
    exports: [
        MessageRepository,
    ]
})
export class MessageModule {}