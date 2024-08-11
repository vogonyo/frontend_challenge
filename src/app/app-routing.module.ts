import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component'; // Import your LoginComponent
import { BalanceComponent } from './balance/balance.component'; // Import the BalanceComponent


const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Default route
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'balance', component: BalanceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
