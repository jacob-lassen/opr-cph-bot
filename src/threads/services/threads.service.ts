import { Injectable } from "@nestjs/common";
import { threadsRepository } from "../repository/threads.repository";

@Injectable()
export class ThreadsService {
    constructor(
        private readonly threadsRepository: threadsRepository,
    ) {}

    async createThread(threadName: string, message: string) {
        return this.threadsRepository.createThread(threadName, message);
    }
}