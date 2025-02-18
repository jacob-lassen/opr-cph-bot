import { Injectable } from "@nestjs/common";
import { Days, Schedule, Weeks } from "../interfaces/schedule.interface";

@Injectable()
export class ScheduleRepository {
    constructor() {}

    async getSchedule(): Promise<Schedule[]> {
        return [
            {
                eventName: 'firefight',
                startTime: '16:30',
                weeks: Weeks.ODD,
                dayOfWeek: Days.MONDAY,
                durationMinutes: 210,
                createNDaysBefore: 5,
                location: 'Faraos',
            }
        ];
    }
}