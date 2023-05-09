import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'planner-ui';
  userEmail: any;
  defaultLenguage: any;
  arrayLenguage: Array<any> = [
    { key: 'English', value: 'en' },
    { key: 'Italiano', value: 'it' },
    { key: 'Espanol', value: 'es' },
  ];

  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {
    translate.getBrowserLang();
    this.defaultLenguage = translate.getBrowserLang();

    if (!!this.defaultLenguage) {
      translate.setDefaultLang(this.defaultLenguage);
      translate.use(translate.defaultLang);
    }
  }

  ngOnInit(): void {}

  isLogged() {
    return this.authService.isLogged();
  }

  select(value: any) {
    let actualLenguage = value.target.value;
    this.translate.setDefaultLang(actualLenguage);
    this.translate.use(actualLenguage);
    //Per settare la traduzione instantanee bisogna poter inserire, 
    this.arrayLenguage.map(x => this.translate.instant(x.key));
  }
}
