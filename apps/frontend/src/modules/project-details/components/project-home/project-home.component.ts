import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { SwIconComponent } from "ngx-simple-widgets";
import { AppState } from "../../../app/app.state";
import { projectOverviewSelector } from "../../store/selectors";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
	selector: 'api-assistant-project-home',
	standalone: true,
	templateUrl: './project-home.component.html',
	styleUrls: ['./project-home.component.scss'],
	imports: [
		SwIconComponent,
		NgIf,
		AsyncPipe
	]
})
export class ProjectHomeComponent {

	public readonly projectOverview$ = this.store.select(projectOverviewSelector);

	constructor(
		private store: Store<AppState>
	) {}
}