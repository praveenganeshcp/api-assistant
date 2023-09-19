import { Component } from '@angular/core';
import {
  SwButtonComponent,
  SwInputComponent
} from "ngx-simple-widgets"
import { RouterModule } from "@angular/router";

@Component({
  selector: 'api-assistant-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    SwButtonComponent,
    SwInputComponent
  ]
})
export class ForgotPasswordComponent {}
