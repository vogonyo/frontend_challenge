import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  customerId: string = '';
  balance: number | undefined;
  transactionAmount: number = 0; // Initialize with 0
  token: string = '';
  targetCustomerId: string = '';
  transferMode: boolean = false;
  transactions: any[] = [];
  searchTransactionId: number | undefined;
  searchedTransaction: any; 

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService,   
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.customerId = params['customerId'];
      this.loadBalance();
    });
  }

  loadBalance(): void {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
  
    if (this.customerId && token) {
      this.apiService.getBalance(this.customerId, token) // Pass token to API service
        .subscribe(response => {
          if (response.success) {
            this.balance = response.balance;
          } else {
            console.error('Failed to fetch balance:', response.message);
          }
        });
    }
  }

  deposit(): void {
    if (this.transactionAmount <= 0) {
      console.error('Invalid deposit amount.');
      return;
    }

    const token = localStorage.getItem('token'); // Retrieve token from local storage

    if (this.customerId && token) {
      this.apiService.deposit(this.customerId, this.transactionAmount, token)
        .subscribe(response => {
          if (response.success) {
            this.loadBalance(); // Reload the balance after deposit
            console.log('Deposit successful:', response.message);
          } else {
            console.error('Deposit failed:', response.message);
          }
        });
    }
  }

  withdraw(): void {
    if (this.transactionAmount <= 0) {
      console.error('Invalid withdrawal amount.');
      return;
    }

    const token = localStorage.getItem('token');

    if (this.customerId && token) {
    this.apiService.withdraw(this.customerId, this.transactionAmount, token)
      .subscribe(response => {
        if (response.success) {
          this.loadBalance(); // Reload the balance after withdrawal
          console.log('Withdrawal successful:', response.message);
        } else {
          console.error('Withdrawal failed:', response.message);
        }
      });
    }
  }

  transfer(): void {
    this.transferMode = true;
  }

  completeTransfer(): void {
    if (!this.targetCustomerId) {
      console.error('Please enter the target customer ID.');
      return;
    }

    if (this.transactionAmount <= 0) {
      console.error('Invalid transfer amount.');
      return;
    }

    const token = localStorage.getItem('token');

    if (this.customerId && token) {
      this.apiService.transfer(this.customerId, this.targetCustomerId, this.transactionAmount, token)
        .subscribe(response => {
          if (response.success) {
            this.loadBalance(); // Reload the balance after transfer
            console.log('Transfer successful:', response.message);
          } else {
            console.error('Transfer failed:', response.message);
          }
        });
    }

    // Reset transfer mode and targetCustomerId
    this.transferMode = false;
    this.targetCustomerId = '';
  }

  showMiniStatement(): void {
    const token = localStorage.getItem('token');
  
    if (this.customerId && token) {
      this.apiService.getMiniStatement(this.customerId, token)
        .subscribe(
          (response: any[]) => {
            this.transactions = response.map(transaction => {
              return {
                id: transaction.id,
                transactionType: transaction.transactionType,
                transactionDate: new Date(transaction.transactionDate).toLocaleString(),
                amount: transaction.amount
              };
            });
            console.log('Mini-statement retrieved successfully:', this.transactions);
          },
          error => {
            console.error('Failed to fetch mini-statement:', error);
          }
        );
    }
  }
  
  searchTransaction(): void {
    if (!this.searchTransactionId) {
      console.error('Invalid transaction ID.');
      return;
    }
  
    const token = localStorage.getItem('token');
  
    if (this.customerId && token) {
      this.apiService.getTransactionDetails(this.searchTransactionId, token)
        .subscribe(response => {
          if (response) {
            this.searchedTransaction = response;
          } else {
            console.error('Transaction not found.');
          }
        });
    }
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove the token from local storage
    // Optionally, you can navigate the user back to the login page
    this.router.navigate(['/login']);
  }

}
