import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from "@angular/router";
import {
  SwButtonComponent,
  SwInputComponent
} from "ngx-simple-widgets"

@Component({
  selector: 'api-assistant-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    SwButtonComponent,
    SwInputComponent
  ]
})
export class LoginComponent {

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  public loginForm: FormGroup = this.createLoginForm();

  private createLoginForm(): FormGroup {
    return this.formBuilder.group({
      emailId: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    })
  }


  public handleLogin() {
  }
}
