import { ChangeDetectionStrategy, Component, inject, Input } from "@angular/core";
import { MinimalEndpointInfo } from "../../types";
import { DatePipe } from "@angular/common";
import { SwButtonComponent, SwIconComponent, SwTooltipComponent } from "ngx-simple-widgets";
import { EndpointFullUrlPipe } from "../../pipes/endpoint-full-url.pipe";

@Component({
  selector: "api-assistant-endpoints-list-item",
  templateUrl: "./endpoints-list-item.component.html",
  styleUrls: ["./endpoints-list-item.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, SwTooltipComponent, SwIconComponent, SwButtonComponent, EndpointFullUrlPipe],
  providers: [EndpointFullUrlPipe]
})
export class EndpointsListItemComponent {
  @Input() minimalEndpointInfo!: MinimalEndpointInfo;

  private readonly endpointFullUrlPipe = inject(EndpointFullUrlPipe);

  protected copyIcon: string = 'content_copy';

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
      ? "Built using custom logic"
      : "Built using Wizard";
  }

  protected handleEndpointURLCopy(event: MouseEvent) {
    event.stopPropagation();
    this.copyIcon = 'check';
    navigator.clipboard.writeText(this.endpointFullUrlPipe.transform(this.minimalEndpointInfo.url));
    setTimeout(() => {
      this.copyIcon = 'content_copy';
    }, 1000);
  }
}
