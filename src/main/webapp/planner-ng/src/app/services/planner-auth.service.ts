import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthData} from "../model/auth-data";

@Injectable({
  providedIn: 'root'
})
export class PlannerAuthService implements OnDestroy {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private _authSub$: BehaviorSubject<AuthData> = new BehaviorSubject<AuthData>(new AuthData('', ''));

  constructor(private http: HttpClient, public router: Router) { }

  public get isAuthenticated$(): Observable<AuthData> {
    return this._authSub$.asObservable();
  }

  public login(credentials: any): Observable<void> {
    let api = `${environment.apiUrl}/public/authenticate`;
    const options = {
      headers : this.headers
    }

    return this.http.post<any>(api, credentials, options)
      .pipe(
        tap( (data : any) => {
          this._authSub$.next(new AuthData(data.access_token, data.refresh_token));
        }),
        catchError(this.handleError)
      )
  }

  // Error
  handleError(error: HttpErrorResponse): Observable<never> {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => error);
  }

  ngOnDestroy(): void {
    this._authSub$.next(new AuthData('',''));
    this._authSub$.complete();
  }

}
