import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  customerId: string = '';
  pin: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const loginData = { customerId: this.customerId, pin: this.pin };

    this.http.post<any>('http://localhost:8080/api/customers/login', loginData)
      .subscribe(response => {
        const token = response.token;

        // Store customerId and token in localStorage
        localStorage.setItem('customerId', this.customerId);
        localStorage.setItem('token', token);

        // Navigate to the balance page
        this.router.navigate(['/balance'], { queryParams: { customerId: this.customerId } });
        // this.router.navigate(['/balance']);

      });
  }
}
