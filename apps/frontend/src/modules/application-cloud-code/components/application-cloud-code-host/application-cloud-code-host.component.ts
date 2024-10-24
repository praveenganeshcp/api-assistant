import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudCodeEditorComponent, CloudCodeFunctionsListComponent } from '@api-assistant/application-cloud-code-fe';
import { SwButtonComponent } from 'ngx-simple-widgets';

@Component({
  selector: 'api-assistant-application-cloud-code-host',
  standalone: true,
  imports: [CommonModule, SwButtonComponent, CloudCodeFunctionsListComponent, CloudCodeEditorComponent],
  templateUrl: './application-cloud-code-host.component.html',
  styleUrls: ['./application-cloud-code-host.component.scss'],
})
export class ApplicationCloudCodeHostComponent {}
