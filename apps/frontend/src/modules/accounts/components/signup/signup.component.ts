import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import {
  SwButtonComponent,
  SwInputComponent
} from "ngx-simple-widgets"

@Component({
  selector: 'api-assistant-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    SwButtonComponent,
    SwInputComponent
  ]
})
export class SignupComponent {}
