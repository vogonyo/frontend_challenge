import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Output() OnSubmitLoginEvent = new EventEmitter();

  login: String = "";
  password: String = "";

  onSubmitLogin() : void {
    this.OnSubmitLoginEvent
  }
}
