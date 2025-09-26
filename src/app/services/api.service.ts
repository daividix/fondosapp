import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl + '/api/v1';
  private userId = environment.userId;

  constructor(private http: HttpClient) {}

  // Obtener fondos
  getAccount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/accounts/${this.userId}`);
  }

  // Obtener fondos
  getFunds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/funds`);
  }

  // Suscribirse a un fondo
  subscribe(accountId: string, fundId: string, amount: number): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/subscriptions`,
      { accountId, fundId, amount, notifyVia: "EMAIL" }
    );
  }

  cancelSubscription(accountId: string, subscriptionId: string) {
    return this.http.post<any>(
      `${this.baseUrl}/cancellations`,
      { accountId, transactionId: subscriptionId }
    );
  }

  // Ver suscripciones activas
  getSubscriptions(accountId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/accounts/${accountId}/subscriptions`
    );
  }

  // Ver transacciones historial
  getTransactions(accountId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/accounts/${accountId}/transactions`
    );
  }
  
}
