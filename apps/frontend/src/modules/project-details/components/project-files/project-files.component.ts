import { Component } from "@angular/core";
import { SwIconComponent } from "ngx-simple-widgets";

@Component({
	selector: 'api-assistant-project-files',
	standalone: true,
	templateUrl: "./project-files.component.html",
	styleUrls: ["./project-files.component.scss"],
	imports: [ SwIconComponent ]
})
<<<<<<< Updated upstream
export class ProjectFilesComponent {}
=======
export class ProjectFilesComponent {
	constructor(
		private store: Store<AppState>
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
>>>>>>> Stashed changes
