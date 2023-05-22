import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventType } from 'src/app/models/eventType.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventtypeService {

  serverUrl: string = `http://${environment.server}:${environment.port}${environment.helperServerUri}`;

  constructor(private http:HttpClient) { }

  public getAllEvent():Observable<EventType[]>{
    return this.http.get<EventType[]>(`${this.serverUrl}/eventType`);
  }
}
