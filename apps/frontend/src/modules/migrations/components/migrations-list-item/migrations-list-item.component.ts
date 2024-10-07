import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanBeNull } from 'ngx-simple-widgets';
import { ApplicationMigration } from '../../types';

@Component({
  selector: 'api-assistant-migrations-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './migrations-list-item.component.html',
  styleUrls: ['./migrations-list-item.component.scss'],
})
export class MigrationsListItemComponent {
  @Input() migration: CanBeNull<ApplicationMigration> = null;
}
