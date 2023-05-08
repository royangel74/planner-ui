import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {PlannerAuthService} from "../services/planner-auth.service";
import {AuthData} from "../model/auth-data";

@Injectable()
export class GuardInterceptor implements HttpInterceptor {

  constructor(private authService: PlannerAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.isAuthenticated$
      .pipe(
        map( (data: AuthData) => {
          return data.access_token;
        })
      );
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken
      }
    });
    return next.handle(request);
  }
}
