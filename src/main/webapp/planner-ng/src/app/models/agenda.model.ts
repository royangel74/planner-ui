import { Event } from "./event.model"

export interface Agenda{
 uidAgenda?:number,
 masterDate:Date,
 startEventTime:string,
 eventExpired:string,
 eventPublic?:string,
 event :Event
}
