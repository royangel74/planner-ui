import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PlannerAuthService} from "../services/planner-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, Subject, takeUntil} from "rxjs";
import {AuthData} from "../model/auth-data";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  public loginValid = true;
  loginForm: FormGroup;
  private _destroySub$ = new Subject<void>();
  private readonly returnUrl: string;

  constructor(public fb: FormBuilder, public authSerice: PlannerAuthService, private route: ActivatedRoute, public router: Router) {
    this.loginForm = fb.group({
      email: [''],
      password: ['']
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  loginUser() {
    this.authSerice.login(this.loginForm.value)
      .subscribe( {
        next: _ => {
          this.loginValid = true;
          this.router.navigateByUrl('/dashboard');
        },
        error: _ => this.loginValid = false
      });
  }

  ngOnInit(): void {
    this.authSerice.isAuthenticated$.pipe(
      filter((value: AuthData) => {
        return value.isValidToken();
      }),
      takeUntil(this._destroySub$)
    ).subscribe( _ => this.router.navigateByUrl(this.returnUrl));
  }

  ngOnDestroy(): void {
    this._destroySub$.next();
  }


}


