import { EventEntityType } from "../interfaces/eventEntityType.enum";
import { EventStatus } from "../interfaces/eventStatus.enum";

export interface GuildScheduleEventCreateDto {
    id: string;
    guild_id: string;
    channel_id: string | null;
    creator_id: string;
    name: string;
    description: string;
    scheduled_start_time: string;
    scheduled_end_time: string;
    privacy_level: 2;
    status: EventStatus;
    entity_type: EventEntityType;
    entity_id: string | null;
    entity_metadata: {
        location: string;
    };
    image: string | null;
};