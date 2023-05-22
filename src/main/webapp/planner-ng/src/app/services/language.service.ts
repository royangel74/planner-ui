import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { Language } from '../Constant.language.ts/constantLanguage';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language:BehaviorSubject<Language[]> = new BehaviorSubject<Language[]>(Language.variableLanguage);
  setLanguage : BehaviorSubject<string> = new BehaviorSubject<string>("en");

  constructor(private translate: TranslateService) { }

  get getLanguage(){
    return this.language;
  }

  changeLanguage(value:string){
    this.setLanguage.next(value)
  }

   get getChangeLanguage(){
    return this.setLanguage;
  }
}
