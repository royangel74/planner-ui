import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginFormComponent} from "./login-form/login-form.component";
import {DashboardFormComponent} from "./dashboard-form/dashboard-form.component";
import {PlannerGuard} from "./helper/planner.guard";

const routes: Routes = [
  { path: '', redirectTo: '/authenticate', pathMatch: 'full' },
  { path: 'authenticate', component: LoginFormComponent },
  {
    path: 'dashboard',
    component: DashboardFormComponent,
    canActivate: [PlannerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
