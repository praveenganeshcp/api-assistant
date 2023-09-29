import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
	selector: 'api-assistant-project-files',
	standalone: true,
	templateUrl: "./project-files.component.html",
	styleUrls: ["./project-files.component.scss"],
	imports: [ MatIconModule ]
})
export class ProjectFilesComponent {}