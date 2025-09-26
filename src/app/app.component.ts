import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ApiService } from './services/api.service';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fondos-app';

  constructor(private api: ApiService, 
    private accountService: AccountService) {}

  ngOnInit() {
    this.api.getAccount()
    .subscribe(account => this.accountService.actualAccount = account)
  }

  get account () {
    return this.accountService.actualAccount;
  }
}
