import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AccountRoutesHeaderComponent } from '../account-routes-header/account-routes-header.component';

@Component({
  selector: 'api-assistant-accounts-shell',
  templateUrl: './accounts-shell.component.html',
  styleUrls: ['./accounts-shell.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    AccountRoutesHeaderComponent
  ]
})
export class AccountsShellComponent {}
