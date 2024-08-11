import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthContentComponent } from './auth-content/auth-content.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BalanceComponent } from './balance/balance.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthContentComponent,
    HeaderComponent,
    ContentComponent,
    WelcomeContentComponent,
    LoginFormComponent,
    RegistrationComponent,
    LoginComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
