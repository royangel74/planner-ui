import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  Subscription,
  delay,
  map,
  of,
  BehaviorSubject,
} from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serverUrl: string = `http://${environment.server}:${environment.port}`;
  tokenSubscription = new Subscription();
  userEmail = new BehaviorSubject<string>('');
  constructor(private http: HttpClient, private route: Router) {}
  users : BehaviorSubject<User> = new BehaviorSubject<User>(null);
  get GetEmail() {
    return this.userEmail;
  }

  setEmail(email: string) {
    if (!!email) {
      this.userEmail.next(email);
    } else {
      var error = 'Nessuna Email trovata';
      this.userEmail.error(error);
    }
  }

  register(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Observable<any> {
    let sub = this.http.post(
      `${this.serverUrl}${environment.publicServerUri}/register`,
      { firstname, lastname, email, password }
    );

    return sub;
  }

  authenticate(email: string, password: string): Observable<any> {
    let sub = this.http
      .post(`${this.serverUrl}${environment.publicServerUri}/authenticate`, {
        email,
        password,
      })
      .pipe(
        map((response: any) => {
          localStorage.setItem('userEmail', email);
          this.setEmail(email);
          this.setSession(response);
          this.getUserInfo(email).subscribe({
            next: (result) => {},
          });
          return response;
        })
      );
    return sub;
  }

  getUserInfo(email: string | null): Observable<User> {
    var user: User;
    return this.http
      .get<User>(
        `${this.serverUrl}${environment.helperServerUri}/user/findByEmail/${email}`).pipe(
          map((response:User)=>{
            user={
              uidUser:response.uidUser,
              name:response.name,
              surname:response.surname,
            }
            this.users.next(user);
            return response;
          })
        );

  }

  refreshToken(refreshToken: string) {
    let sub = this.http.post(
      `${this.serverUrl}${environment.helperServerUri}/refresh-token`,
      { refreshToken }
    );
    return sub;
  }

  private setSession(response: any): void {
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('expires_at', this.getExpiration().format());
    this.expirationCounter(response);
  }

  getExpiration(): any {
    let expires_at = moment().add(20, 'minutes');
    return expires_at;
  }

  expirationCounter(response: any): void {
    let expiration = this.getExpiration().subtract(1, 'minutes');

    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null)
      .pipe(delay(expiration.toDate()))
      .subscribe((expired) => {
        console.log('refresh token!', response);
        this.refreshToken(response.refresh_token).subscribe({
          next: (result) => {
            response = result;
            this.setSession(response);
          },
        });
      });
  }

  isLogged(): boolean {
    const expires_at = moment(localStorage.getItem('expires_at'));

    return moment().isBefore(expires_at);
  }

  logout(): void {
    localStorage.clear();
    this.route.navigate(['login']);
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

   get getUser(){
    return  this.users;
  }
}
