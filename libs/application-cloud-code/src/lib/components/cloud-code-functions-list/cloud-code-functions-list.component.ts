import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'api-assistant-cloud-code-functions-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cloud-code-functions-list.component.html',
  styleUrls: ['./cloud-code-functions-list.component.scss'],
})
export class CloudCodeFunctionsListComponent {
  files = [
    { name: 'index.html' },
    { name: 'app.component.ts' },
    { name: 'styles.scss' },
    { name: 'main.ts' },
    { name: 'README.md' },
    { name: 'angular.json' },
    { name: 'package.json' },
    { name: 'tsconfig.json' },
    { name: 'polyfills.ts' },
    { name: 'app.module.ts' }
  ];
}
