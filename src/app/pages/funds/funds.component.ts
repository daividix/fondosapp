import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class FundsComponent implements OnInit {
  funds: any[] = [];
  accountId = 'acct-0001'; // fija por ahora la cuenta inicial
  selectedFund: string | null = null;
  amount = 0;
  message = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getFunds()
    .subscribe(data => (this.funds = data));
  }

  subscribeToFund() {
    if (!this.selectedFund || this.amount <= 0) {
      this.message = 'Selecciona un fondo y monto válido';
      return;
    }

    this.api.subscribe(this.accountId, this.selectedFund, this.amount).subscribe({
      next: res => {
        this.message = `✅ Suscripción realizada al fondo ${this.selectedFund}`;
      },
      error: err => {
        this.message = `❌ Error: ${err.message}`;
      }
    });
  }
}
