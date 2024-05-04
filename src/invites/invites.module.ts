import { Module } from "@nestjs/common";
import { InvitesRepository } from "./repositories/invites.repository";
import { DiscordModule } from "src/discord/discord.module";
import { ConfigModule } from "@nestjs/config";
import { invitesService } from "./services/invites.service";

@Module({
    imports: [
        DiscordModule,
        ConfigModule,
    ],
    controllers: [],
    providers: [
        invitesService,
        InvitesRepository,
    ],
    exports: [invitesService]
})
export class InvitesModule {}