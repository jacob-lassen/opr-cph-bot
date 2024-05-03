import { applyDecorators } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

export const Pattern = (pattern: string) => {
    const messagePattern = MessagePattern(pattern);
    return applyDecorators(messagePattern);
};