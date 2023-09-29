import { Component } from "@angular/core";
import { 
	SwIconComponent,
	SwButtonComponent,
	SwSwitchComponent
} from "ngx-simple-widgets";

@Component({
	selector: 'api-assistant-project-settings',
	standalone: true,
	templateUrl: './project-settings.component.html',
	styleUrls: ['./project-settings.component.scss'],
	imports: [
		SwIconComponent,
		SwButtonComponent,
		SwSwitchComponent
	]
})
export class ProjectSettingsComponent {}