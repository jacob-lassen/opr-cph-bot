import { Injectable } from "@nestjs/common";
import { InvitesRepository } from "../repositories/invites.repository";

@Injectable()
export class invitesService {
    constructor(
        private readonly InvitesRepository: InvitesRepository,
    ) {}

    async createInvite() {
        return this.InvitesRepository.createInvite();
    }
}