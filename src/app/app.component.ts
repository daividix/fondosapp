import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ApiService } from './services/api.service';
import { AccountService } from './services/account.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fondos-app';
  currentRoute = '';

  constructor(private api: ApiService, 
    private accountService: AccountService,
    private router: Router) {}

  ngOnInit() {
    this.api.getAccount()
    .subscribe(account => this.accountService.actualAccount = account)
    this.currentRoute = this.router.url;
    console.log(this.currentRoute)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        console.log(this.currentRoute)
      }
    });
  }

  get account () {
    return this.accountService.actualAccount;
  }
}
