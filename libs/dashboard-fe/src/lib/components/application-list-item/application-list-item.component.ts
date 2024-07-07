import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwIconComponent, SwButtonComponent } from 'ngx-simple-widgets';
import { Application } from '../../types';

@Component({
  selector: 'api-assistant-application-list-item',
  standalone: true,
  imports: [CommonModule, RouterModule, SwIconComponent, SwButtonComponent],
  templateUrl: './application-list-item.component.html',
  styleUrls: ['./application-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationListItemComponent {
  @Input() application!: Application;
}
