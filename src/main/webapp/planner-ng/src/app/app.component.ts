import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'planner-ui';
  userEmail: any;
  //all available translation languages
  allLangs: Array<any> = [
    { key: 'Inglese', value: 'en' },
    { key: 'Italiano', value: 'it' },
  ];
  //new array filterd to show options in the template
  availableLangs: Array<any> = [];
  defaultLang: string = '';
  currentLang: string = '';

  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {
    const browserDefaultLang = translate.getBrowserLang();
    const englishLangCod = 'en';

    if (browserDefaultLang) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang(browserDefaultLang);
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use(browserDefaultLang);
      this.defaultLang = browserDefaultLang;
    } else {
      translate.setDefaultLang(englishLangCod);
      translate.use(englishLangCod);
      this.defaultLang = englishLangCod;
    }
  }

  ngOnInit(): void {
    this.setLanguage();
  }

  setLanguage(event?: any) {
    if (event) {
      const selectedLang = event.target.value;
      this.translate.use(selectedLang);
      this.currentLang = selectedLang;
    } else {
      this.currentLang = this.translate.currentLang;
    }

    const indexCurrentLang = this.allLangs.findIndex(
      (lang) => lang.value == this.currentLang
    );

    if (indexCurrentLang >= 0) {
      this.availableLangs = this.allLangs.filter(
        (lang, index) => index !== indexCurrentLang
      );
    }
    this.availableLangs.map(x=> this.translate.instant(x.key)); 
  }

  isLogged() {
    return this.authService.isLogged();
  }
}
