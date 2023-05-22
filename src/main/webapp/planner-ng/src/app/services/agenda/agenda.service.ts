import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Agenda } from 'src/app/models/agenda.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  serverUrl: string = `http://${environment.server}:${environment.port}${environment.plannerServerUri}`;
  event: BehaviorSubject<EventInput[]> = new BehaviorSubject<EventInput[]>(
    null
  );
  constructor(private http: HttpClient) {}

  public getAllAgenda(): Observable<Agenda[]> {

    let input: EventInput;
    let arrInput: EventInput[] = [];
    return this.http.get<Agenda[]>(`${this.serverUrl}/agenda/findAll`).pipe(
      map((i) => {
        i.map((i) =>
          arrInput.push(
            (input = {
              id:i.uidAgenda.toString(),
              title: i.event.description,
              start: i.masterDate.toString() + 'T' + i.startEventTime,
              end: i.masterDate.toString() + 'T' + i.eventExpired,
              extendedProps: {
                department: i.event.user.uidUser,
              },
              description: i.event.eventType.eventName,
            })
            // more events ...
          )
        );

        this.event.next(arrInput);

        return i;
      })
    );
  }
 public insertAgenda(agenda:Agenda):Observable<any>{
  return this.http.post<any>(`${this.serverUrl}/agenda/insertAgenda`,agenda);
 }
  get arrInput() {
    return this.event;
  }
}

