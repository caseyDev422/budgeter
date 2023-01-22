import { Bill } from './Bill';
export interface CalendarEvent {
    id: string;
    start: string;
    end?: string;
    title: string;
}