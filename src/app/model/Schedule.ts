import { User } from './User';

export const ScheduleType = {
    NONE: "NONE",
    DAILY: "DAILY",
    WEEKLY: "WEEKLY"
}

export interface Schedule {
    id: String,
    startDateTime: Date,
    endDateTime: Date,
    repeat: String,
    event?: Event,
    users?: User[]
}