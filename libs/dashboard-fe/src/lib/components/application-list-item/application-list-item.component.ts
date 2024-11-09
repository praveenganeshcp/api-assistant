import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApplicationDashboardView } from "@api-assistant/application-core";
import { CanBeNull, SwIconComponent } from "ngx-simple-widgets";
import { RouterLink } from "@angular/router";

@Component({
  selector: "api-assistant-application-list-item",
  standalone: true,
  imports: [CommonModule, SwIconComponent, RouterLink],
  templateUrl: "./application-list-item.component.html",
  styleUrls: ["./application-list-item.component.scss"],
})
export class ApplicationListItemComponent {

  @Input() index: number = 0;

  @Input() application: CanBeNull<ApplicationDashboardView> = null;

  get backgroundClass(): string {
      return `light-gradient-${(this.index % 5) + 1}`;
  }
}
