import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountRoutesHeaderComponent } from '../account-routes-header/account-routes-header.component';

/**
 * Shell component for account related routes.
 * Renders a simple banner for context
 */
@Component({
  selector: 'api-assistant-accounts-shell',
  templateUrl: './accounts-shell.component.html',
  styleUrls: ['./accounts-shell.component.scss'],
  standalone: true,
  imports: [RouterModule, AccountRoutesHeaderComponent],
})
export class AccountsShellComponent {}
