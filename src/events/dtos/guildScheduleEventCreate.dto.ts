import { EventEntityType } from "../interfaces/eventEntityType.enum";
import { EventStatus } from "../interfaces/eventStatus.enum";

export interface GuildScheduleEventCreateDto {
    id: number;
    guild_id: number;
    channel_id: number | null;
    creator_id: number;
    name: string;
    description: string;
    scheduled_start_time: string;
    scheduled_end_time: string;
    privacy_level: 2;
    status: EventStatus;
    entity_type: EventEntityType;
    entity_id: number | null;
    entity_metadata: {
        location: string;
    };
    image: string | null;
};