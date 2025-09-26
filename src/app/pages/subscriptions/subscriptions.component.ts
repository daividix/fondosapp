import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent implements OnInit {
  accountId = 'acct-0001';
  subs: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getSubscriptions(this.accountId)
    .subscribe(data => (this.subs = data));
  }
}
