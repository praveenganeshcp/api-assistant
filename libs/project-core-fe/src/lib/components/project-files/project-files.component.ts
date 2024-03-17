import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { SwButtonComponent, SwIconComponent, SwLoaderComponent } from "ngx-simple-widgets";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Observable, map } from "rxjs";
import { GlobalState } from "../../store/state";
import { currentExplorerPathSelector, explorerObjectsErrorSelector, explorerObjectsListSelector, explorerObjectsLoadingSelector } from "../../store/selectors";
import { goInsideFolderAction } from "../../store/actions";
import { FileObject } from "../../types";

interface BreadCrumb {
	path: string;
	name: string;
}

@Component({
	selector: 'api-assistant-project-files',
	standalone: true,
	templateUrl: "./project-files.component.html",
	styleUrls: ["./project-files.component.scss"],
	imports: [ 
		SwIconComponent,
		NgIf,
		NgFor,
		AsyncPipe,
		SwButtonComponent,
		SwLoaderComponent
	],
})
export class ProjectFilesComponent {
	constructor(
		private store: Store<GlobalState>
	) {}

	explorerObjects$ = this.store.select(explorerObjectsListSelector)

	explorerObjectsLoading$ = this.store.select(explorerObjectsLoadingSelector);

	explorerObjectsErrorMsg$ = this.store.select(explorerObjectsErrorSelector);

	breadcrumb$: Observable<BreadCrumb[]> = this.store.select(currentExplorerPathSelector).pipe(
		map((currentExplorerPath) => {
			currentExplorerPath = currentExplorerPath.endsWith("/") ? currentExplorerPath.slice(0, currentExplorerPath.length-1) : currentExplorerPath
			const breadcrumbs: BreadCrumb[] = [];
			let combinedPath: string = ""
			currentExplorerPath.split('/').forEach((currentPath) => {
				combinedPath += currentPath +  "/" 
				breadcrumbs.push({
					name: currentPath === "" ? "Home" : currentPath,
					path: combinedPath
				})
			})
			return breadcrumbs
		})
	)

	openBreadCrumbPath(path: string) {
		this.store.dispatch(goInsideFolderAction({ folderPath: path }))
	}

	ngOnInit() {
		this.store.dispatch(goInsideFolderAction({ folderPath: "/" }))
	}

	openFolder(object: FileObject) {
		if(object.isFile) {
			return
		}
		this.store.dispatch(goInsideFolderAction({ folderPath: object.path }))
	}
}
