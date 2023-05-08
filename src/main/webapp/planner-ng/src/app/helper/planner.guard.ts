import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {combineLatest, map, mapTo, Observable, of} from 'rxjs';
import {PlannerAuthService} from "../services/planner-auth.service";
import {AuthData} from "../model/auth-data";

@Injectable({
  providedIn: 'root'
})
export class PlannerGuard implements CanActivate {

  constructor(public authService: PlannerAuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
      map((data: AuthData) => {
        return data.isValidToken();
      }),
      map((s: boolean) => s ? true: this.router.parseUrl('/login'))
    )
  }
}
