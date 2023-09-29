import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import {
  Project
} from "../../store/dashboard.state";
import { 
  SwIconComponent,
  SwButtonComponent
} from "ngx-simple-widgets";

@Component({
  selector: 'api-assistant-dashboard-project-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SwIconComponent,
    SwButtonComponent
  ],
  templateUrl: './dashboard-project-card.component.html',
  styleUrls: ['./dashboard-project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardProjectCardComponent {
  @Input() project!: Project;
}
