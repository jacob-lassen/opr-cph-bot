export enum Weeks {
    EVEN = 'even',
    ODD = 'odd',
    EVERY = 'every'
}

export enum Days {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday'
}

export interface Schedule {
    eventName: string;
    startTime: string;
    dayOfWeek: Days;
    weeks: Weeks;
    durationMinutes: number
    createNDaysBefore: number;
    location: string;
}