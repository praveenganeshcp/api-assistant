import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SwIconComponent,
  SwListViewComponent,
  SwListViewItem,
} from "ngx-simple-widgets";

@Component({
  selector: "api-assistant-cloud-code-functions-list",
  standalone: true,
  imports: [CommonModule, SwIconComponent, SwListViewComponent],
  templateUrl: "./cloud-code-functions-list.component.html",
  styleUrls: ["./cloud-code-functions-list.component.scss"],
})
export class CloudCodeFunctionsListComponent {
  private _listItems: SwListViewItem[] = [];

  @Input()
  set listItems(data: string[]) {
    this._listItems = data.map((item, index) => {
      return <SwListViewItem>{
        id: item,
        text: item,
        icon: "javascript",
      };
    });
  }

  get listItems(): SwListViewItem[] {
    return this._listItems;
  }

  @Input() selectedFile: string = "";

  @Output() fileSelected = new EventEmitter<string>();

  protected handleFileSelection(selectedItem: SwListViewItem) {
    this.fileSelected.emit(selectedItem.text);
  }
}
