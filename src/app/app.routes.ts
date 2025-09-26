import { Routes } from '@angular/router';
import { FundsComponent } from './pages/funds/funds.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'funds', pathMatch: 'full' },
	{ path: 'funds', component: FundsComponent },
	{ path: 'subscriptions', component: SubscriptionsComponent }
];
