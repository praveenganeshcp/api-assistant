import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwInputComponent } from 'ngx-simple-widgets';

@Component({
  selector: 'commons-fe-search-input',
  standalone: true,
  imports: [FormsModule, SwInputComponent],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Input() placeholder: string = '';

  protected searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  protected handleSearchChange() {
    this.search.emit(this.searchTerm);
  }
}
