import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { environment } from "apps/frontend/src/environments/environment.dev";
import { ProjectDetailsRepository } from "../../repository/project-details.repository";
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { Store } from "@ngrx/store";
import { AppState } from "../../../app/app.state";
import { projectAPIKeyDetailsSelector } from "../../store/selectors";
import { filter, switchMap, take } from "rxjs";

@Component({
	selector: 'api-assistant-project-logs',
	standalone: true,
	imports: [
		FormsModule,
		NgJsonEditorModule
	],
	styleUrls: ['./project-logs.component.scss'],
	templateUrl: './project-logs.component.html'
})
export class ProjectLogsComponent {
	apiUrl: string = environment.apiUrl

	public editorOptions = new JsonEditorOptions()

	public get crudUrl() {
		return `${this.apiUrl}api/v6/core-engine/crud`
	}

	input: string = ""

	data = {};

	response: Object = ""

	apiKeyDetails$ = this.store.select(projectAPIKeyDetailsSelector);

	constructor(
		private repository: ProjectDetailsRepository,
		private store: Store<AppState>
	) {
		this.editorOptions = new JsonEditorOptions();
    	this.editorOptions.mode = "code"
		this.editorOptions.indentation = 2;
	}

	handleChange(value: any) {
		if(value.isTrusted) {
			return
		}
		this.data = value
		console.log(this.data)
	}

	sendRequest() {
		this.apiKeyDetails$.pipe(
			filter(details => details !== null),
			switchMap((details) => {
				return this.repository.performCRUD(this.data, details?.key || "")
			}),
			take(1)
		).subscribe(response => {
			this.response = JSON.stringify(response, undefined, 6);
		})
	}
}