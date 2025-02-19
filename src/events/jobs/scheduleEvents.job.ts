import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ScheduleRepository } from "../repositories/schedule.repository";
import { DateTime } from "luxon";
import { Days, Schedule, Weeks } from "../interfaces/schedule.interface";
import { ScheduledEventsRepository } from "../repositories/scheduledEvents.repository";
import { ScheduledEvent } from "../interfaces/scheduledEvent.interface";
import { ConfigService } from "@nestjs/config";
import { EventEntityType } from "../interfaces/eventEntityType.enum";
import { MessageRepository } from "src/message/repositories/message.repository";
import { DiscordConfig } from "src/config/interfaces/discordConfig.interface";

const daysMap = new Map<number, Days>();
daysMap.set(1, Days.MONDAY);
daysMap.set(2, Days.TUESDAY);
daysMap.set(3, Days.WEDNESDAY);
daysMap.set(4, Days.THURSDAY);
daysMap.set(5, Days.FRIDAY);
daysMap.set(6, Days.SATURDAY);
daysMap.set(7, Days.SUNDAY);

@Injectable()
export class ScheduleEventsJob {
    constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly scheduledEventsRepository: ScheduledEventsRepository,
        private readonly MessageRepository: MessageRepository,
        private readonly configService: ConfigService,
    ) {}

    @Cron('0 0 9 * * *', { name: 'schedule-events', timeZone: 'Europe/Copenhagen' })
    async handle() {
        console.log('Scheduling events');
        const discordConfig = this.configService.get('discord') as DiscordConfig;
        const schedule = await this.scheduleRepository.getSchedule();
        const promises = schedule.map(async (schedule: Schedule) => {
            const eventDate = DateTime.now().setZone('Europe/Copenhagen').plus({ days: schedule.createNDaysBefore });

            if (!shouldSchedule(eventDate, schedule)) {
                return;
            }

            const [startHours, startMinutes] = schedule.startTime.split(':').map(Number);
            const start = eventDate.set({ hour: startHours, minute: startMinutes });
            const end = start.plus({ minutes: schedule.durationMinutes });

            const scheduledEvent: ScheduledEvent = {
                id: null,
                guildId: discordConfig.guildId,
                name: schedule.eventName,
                startTime: start.toJSDate(),
                endTime: end.toJSDate(),
                createdBy: null,
                threadId: null,
                threadMembers: [],
                entityType: EventEntityType.EXTERNAL,
                location: schedule.location,
            };
            const response = await this.scheduledEventsRepository.createEvent(scheduledEvent);
            const inviteLink = `https://discord.com/events/${scheduledEvent.guildId}/${response.id}`;
            await this.MessageRepository.sendMessage(inviteLink, discordConfig.generalChannelId);
        });
        await Promise.all(promises);
    }
}


function shouldSchedule(date: DateTime, schedule: Schedule) {
    return matchDayOfWeek(date, schedule) && matchWeeks(date, schedule);
}

function matchDayOfWeek(date: DateTime, schedule: Schedule) {
    return daysMap.get(date.weekday) === schedule.dayOfWeek;
}

function matchWeeks(date: DateTime, schedule: Schedule) {
    if (schedule.weeks === Weeks.ODD) {
        return date.weekNumber % 2 === 1;
    }

    if (schedule.weeks === Weeks.EVEN) {
        return date.weekNumber % 2 === 0;
    }

    return true;
}
