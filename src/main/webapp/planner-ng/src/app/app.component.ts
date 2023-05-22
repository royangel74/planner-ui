import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
  title = 'planner-ui';
  userEmail: any;
  defaultLenguage: any;
  arrayLenguage: any;
  currentLenguage: any;

  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private language: LanguageService,
    private changeDetector: ChangeDetectorRef
  ) {
    translate.getBrowserLang();
    this.defaultLenguage = translate.getBrowserLang();

    if (!!this.defaultLenguage) {
      translate.setDefaultLang(this.defaultLenguage);
      translate.use(translate.defaultLang);
    }
  }
  ngOnDestroy(): void {
    this.language.setLanguage.unsubscribe();
  }

  ngOnInit(): void {}

  isLogged() {
    return this.authService.isLogged();
  }

  select() {
    this.language.getChangeLanguage.subscribe(
      (x) => (this.currentLenguage = x)
    );
    this.translate.setDefaultLang(this.currentLenguage);
    this.translate.use(this.currentLenguage);
    let allLenguage: any = [];
    this.language.getLanguage.subscribe((x) => (allLenguage = x));
    allLenguage.map((c: { key: string | string[] }) =>
      this.translate.instant(c.key)
    );
  }

  ngAfterViewChecked(): void {
    this.select();
    this.changeDetector.detectChanges();
  }
}
