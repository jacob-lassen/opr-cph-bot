import { Injectable } from "@nestjs/common";
import { ThreadMembersRepository } from "../repository/threadMembers.repository";

@Injectable()
export class ThreadMembersService {
    constructor(
        private readonly threadMembersRepository: ThreadMembersRepository,
    ) {}

    async addMember(channelId: string, memberId: string): Promise<void> {
        return this.threadMembersRepository.addMember(channelId, memberId);
    }
}