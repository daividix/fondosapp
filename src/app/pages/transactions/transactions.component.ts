import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AccountService } from '../../services/account.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-transactions',
  imports: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {

  transactions: any[] = [];


  constructor(private api: ApiService,
    private accountService: AccountService) {}

  ngOnInit() {
    zip(this.api.getFunds(), this.api.getTransactions(this.account.accountId))
    .subscribe(([funds, transactions]) => {
      console.log(transactions);
      this.transactions = transactions.map(transaction => {
        return {
          id: transaction.transactionId,
          fund: funds.find(fund => fund.fundId == transaction.fundId),
          amount: transaction.amount,
          type: transaction.type,
          date: new Date(transaction.createdAt).toLocaleString()
        }
      })
    })

  }

  get account() {
    return this.accountService.actualAccount;
  }
}
