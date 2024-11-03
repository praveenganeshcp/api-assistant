import { NgFor, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SidepanelMenuItem } from "./types";
import { SwIconComponent } from "ngx-simple-widgets";

@Component({
  selector: "commons-fe-side-panel",
  standalone: true,
  imports: [RouterModule, NgFor, SwIconComponent, NgIf],
  templateUrl: "./side-panel.component.html",
  styleUrls: ["./side-panel.component.scss"],
})
export class SidePanelComponent {
  @Input() menuItems: SidepanelMenuItem[] = [];
}
