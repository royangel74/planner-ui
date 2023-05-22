import { EventType } from "./eventType.model";
import { User } from "./user.model";

export interface Event {
    uidEnvent?: number;
    description: string;
    eventType: EventType ;
    user: User;
}
