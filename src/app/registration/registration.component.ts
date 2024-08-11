import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  private apiUrl = environment.apiUrl;
  customerId: string = ''; 
  firstname: string = '';
  lastname: string = '';
  email: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  registerCustomer() {
    const registrationData = {
      customerId: this.customerId,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email
    };
    
    const url = `${this.apiUrl}/api/customers/register`;

    this.http.post(url, registrationData)
      .subscribe(
        response => {
          console.log('Registration successful:', response);

          // Optionally, navigate to the login page after successful registration
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration failed:', error);
          // Handle registration failure, e.g., show an error message
        }
      );
  }
}
