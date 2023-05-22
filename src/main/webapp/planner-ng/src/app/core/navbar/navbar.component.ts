import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LanguageService } from 'src/app/services/language.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userEmail: any;
  userName: any;
  userSurname: any;
  allLenguage: any;
  constructor(
    private authService: AuthService,
    private language: LanguageService,
  ) {}



  ngOnInit(): void {
    this.language.getLanguage.subscribe((x) => (this.allLenguage = x));

    this.authService.getUserInfo(this.authService.getUserEmail()).subscribe({
      next: (result) => {
        console.log('userinfo ', result);
        this.userName = result.name;
        this.userSurname = result.surname;
      },
    });
  }

  logOut(): void {
    this.authService.logout();
  }

  select(value: any) {
    var language : string = value.target.value;

    this.language.changeLanguage(language);

  }
}
