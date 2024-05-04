import { Module } from "@nestjs/common";
import { DiscordHttpService } from "./services/discordHttp.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    controllers: [],
    providers: [DiscordHttpService],
    exports: [DiscordHttpService]
})
export class DiscordModule {}