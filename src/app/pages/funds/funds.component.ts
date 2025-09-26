import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';
import { zip } from 'rxjs';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class FundsComponent implements OnInit {
  funds: any[] = [];
  subscriptions: any[] = [];
  selectedSubscription: any = null;
  selectedFund: any = null;
  amount: number | null = null;
  modalNewSubscription: any = null;
  modalInfoSubscription: any = null;
  modalConfirmCancel: any = null;
  saving = false;
  showToastMsg = false;
  toastMsg = {
    msg: '',
    type: ''
  }

  constructor(private api: ApiService,
    private accountService: AccountService) {}

  ngOnInit(): void {
    this.findSubscriptions();
  }

  ngAfterViewInit() {
    this.modalNewSubscription = new bootstrap.Modal('#modalNewSubscription')
    this.modalInfoSubscription = new bootstrap.Modal('#modalInfoSubscription')
    this.modalConfirmCancel = new bootstrap.Modal('#modalConfirmCancel')
  }

  findSubscriptions() {
    zip(this.api.getFunds(), this.api.getSubscriptions(this.account.accountId))
    .subscribe(([funds, subs]) => {
      console.log(funds, subs);
      this.funds = funds;
      this.subscriptions = subs
      .filter(sub => sub.stateName == 'ACTIVE')
      .map(sub => {
        return {
          id: sub.subscriptionId,
          fund: this.funds.find(fund => fund.fundId == sub.fundId),
          amount: sub.amount,
          date: new Date(sub.createdAt).toLocaleDateString()
        }
      })
    })
  }

  updateSubscriptions(cb?: any) {
    this.api.getSubscriptions(this.account.accountId)
    .subscribe(subs => {
      this.subscriptions = subs
      .filter(sub => sub.stateName == 'ACTIVE')
      .map(sub => {
        return {
          id: sub.subscriptionId,
          fund: this.funds.find(fund => fund.fundId == sub.fundId),
          amount: sub.amount,
          date: new Date(sub.createdAt).toLocaleDateString()
        }
      })
      cb();
    })
  }

  get account () {
    return this.accountService.actualAccount;
  }

  selectSubscription(subs: any) {
    this.selectedSubscription = subs;
    this.modalInfoSubscription.show();
    console.log(this.selectedSubscription)
  }

  subscribeToFund() {
    this.saving = true;
    this.api.subscribe(this.account.accountId, 
      this.selectedFund.fundId, this.amount || 0)
    .subscribe(res => {
      this.showToast('Subscripción creada!', 'success');
      this.amount = null;
      this.updateSubscriptions(() => {
        this.selectedFund = null;
        this.modalNewSubscription.hide();
        this.saving = false;
      });
      this.api.getAccount()
      .subscribe(account => this.accountService.actualAccount = account);
    }, error => {
      console.log(error)
      if(error.error.messsage) {
        this.showToast(error.error.messsage, 'danger');
      } else {
        this.showToast('No se pudo guardar la información', 'danger');
      }
      this.modalNewSubscription.hide();
      this.amount = null;
      this.selectedFund = null;
      this.saving = false;
    })
  }

  cancelSubscription() {
    this.saving = true;
    this.api.cancelSubscription(this.account.accountId,
      this.selectedSubscription.id)
    .subscribe(res => {
      this.showToast('Cancelada!', 'success');
      this.updateSubscriptions(() => {
        this.modalConfirmCancel.hide();
        this.saving = false;
      });
      this.api.getAccount()
      .subscribe(account => this.accountService.actualAccount = account);
    }, error => {
      console.log(error)
      if(error.error.messsage) {
        this.showToast(error.error.messsage, 'danger');
      } else {
        this.showToast('No se pudo guardar la información', 'danger');
      }
      this.modalConfirmCancel.hide();
      this.saving = false;
    })
  }

  showToast(msg: string, type: string) {
    this.toastMsg = {msg, type}
    this.showToastMsg = true;
    setTimeout(() => {
      this.showToastMsg = false;
    }, 3000)
  }
}
