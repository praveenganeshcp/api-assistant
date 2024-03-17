import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { SwIconComponent } from "ngx-simple-widgets";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Observable, map } from "rxjs";
import { ChartConfiguration, ChartOptions } from "chart.js";
import { NgChartsModule } from 'ng2-charts';
import { projectOverviewSelector } from "../../store/selectors";
import { GlobalState } from "../../store/state";

@Component({
	selector: 'api-assistant-project-home',
	standalone: true,
	templateUrl: './project-home.component.html',
	styleUrls: ['./project-home.component.scss'],
	imports: [
		SwIconComponent,
		NgIf,
		AsyncPipe,
		NgFor,
		NgChartsModule
	]
})
export class ProjectHomeComponent {

	private readonly projectOverview$ = this.store.select(projectOverviewSelector);

	public lineChartData$: Observable<ChartConfiguration<'bar'>['data']> = this.projectOverview$.pipe(
		map(projectData => {
			if(projectData === null) {
				return {
					labels: [] as string[],
					datasets: [
						{
							data: [] as number[],
							label: ''
						}
					]
				}
			}
			const dbStats = projectData.dbStats;
			return {
				labels: [
				  'Create',
				  'Read',
				  'Update',
				  'Delete',
				  'Aggregate'
				],
				datasets: [
				  {
					data: [
						dbStats.createAction,
						dbStats.readAction,
						dbStats.updateAction,
						dbStats.deleteAction,
						dbStats.aggregate
					],
					label: 'Actions',
					backgroundColor: 'rgba(255,0,0,0.3)'
				  }
				]
			  }
		})
	);

	public lineChartOptions: ChartOptions<'bar'> = {
		responsive: true
	};


	constructor(
		private store: Store<GlobalState>
	) {}
}