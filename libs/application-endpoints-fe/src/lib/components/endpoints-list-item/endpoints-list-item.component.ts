import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MinimalEndpointInfo } from "../../types";
import { DatePipe } from "@angular/common";
import { SwIconComponent, SwTooltipComponent } from "ngx-simple-widgets";

@Component({
  selector: "api-assistant-endpoints-list-item",
  templateUrl: "./endpoints-list-item.component.html",
  styleUrls: ["./endpoints-list-item.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, SwTooltipComponent, SwIconComponent],
})
export class EndpointsListItemComponent {
  @Input() minimalEndpointInfo!: MinimalEndpointInfo;

  protected get securityIcon(): string {
    return this.minimalEndpointInfo.isAuthenticated ? "key" : "key_off";
  }

  protected get securityTooltip(): string {
    return this.minimalEndpointInfo.isAuthenticated
      ? "Authenticated"
      : "Unauthenticated";
  }

  protected get logicTypeIcon(): string {
    return this.minimalEndpointInfo.useCloudCode === true
      ? "code"
      : "construction";
  }

  protected get logicTypeToolip(): string {
    return this.minimalEndpointInfo.useCloudCode === true
      ? "Custom logic"
      : "Wizard";
  }
}
