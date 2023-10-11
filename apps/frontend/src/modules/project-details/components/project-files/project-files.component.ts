import { Component } from "@angular/core";
import { SwIconComponent } from "ngx-simple-widgets";

@Component({
	selector: 'api-assistant-project-files',
	standalone: true,
	templateUrl: "./project-files.component.html",
	styleUrls: ["./project-files.component.scss"],
	imports: [ SwIconComponent ]
})
export class ProjectFilesComponent {}