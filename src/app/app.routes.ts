import { Routes } from '@angular/router';
import { FundsComponent } from './pages/funds/funds.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'fondos', pathMatch: 'full' },
	{ path: 'fondos', component: FundsComponent },
	{ path: 'transacciones', component: TransactionsComponent }
];
