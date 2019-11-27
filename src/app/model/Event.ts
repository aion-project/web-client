import { User } from './User';

export const EventType = {
    NONE: "NONE",
    DAILY: "DAILY",
    WEEKLY: "WEEKLY",
    MONTHLY: "MONTHLY",
}

export interface Event {
    id: String,
    name: String,
    description?: String,
    startDateTime: Date,
    endDateTime?: Date,
    repeat: String,
    createdBy: User,
}