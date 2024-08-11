import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Change this to match your API's URL

  constructor(private http: HttpClient) {}

  getBalance(customerId: string, token: string): Observable<any> {
    const url = `${this.apiUrl}/api/accounts/${customerId}/balance`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url, { headers });
  }

  deposit(customerId: string, amount: number, token: string): Observable<any> {
    const url = `${this.apiUrl}/api/accounts/${customerId}/deposit/${amount}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(url, {}, { headers }); // Pass headers as a separate argument
  }
  
  withdraw(customerId: string, amount: number, token: string): Observable<any> {
    const url = `${this.apiUrl}/api/accounts/${customerId}/withdrawal/${amount}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(url, {}, { headers }); // Pass headers as a separate argument
  }
  

  transfer(senderCustomerId: string, receiverCustomerId: string, amount: number, token: string): Observable<any> {
    const url = `${this.apiUrl}/api/accounts/${senderCustomerId}/transfer/${receiverCustomerId}/${amount}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(url, {}, {headers});
  }

  getMiniStatement(customerId: string, token: string): Observable<any> {
    const url = `${this.apiUrl}/api/accounts/${customerId}/mini-statement`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url, { headers });
  }

  getTransactionDetails(transactionId: number, token: string): Observable<any> {
    const url = `${this.apiUrl}/api/transactions/${transactionId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url, { headers });
  }

}
