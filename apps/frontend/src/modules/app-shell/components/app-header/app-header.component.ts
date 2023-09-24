import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'api-assistant-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterModule
  ]
})
export class AppHeaderComponent {
  constructor(
  ) {}

  public handleLogout() {
  }
}
