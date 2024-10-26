import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'api-assistant-cloud-code-functions-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cloud-code-functions-list.component.html',
  styleUrls: ['./cloud-code-functions-list.component.scss'],
})
export class CloudCodeFunctionsListComponent {

  @Input() files: string[] = []

  @Output() fileSelected = new EventEmitter<string>();

  protected handleFileSelection(fileName: string) {
    this.fileSelected.emit(fileName);
  }
}
