import { Injectable } from "@nestjs/common";
import { InvitesRepository } from "../repositories/invites.repository";

@Injectable()
export class invitesService {
    constructor(
        private readonly InvitesRepository: InvitesRepository,
    ) {}

    async createInvite(expiresAt: Date) {
        return this.InvitesRepository.createInvite(expiresAt);
    }
}