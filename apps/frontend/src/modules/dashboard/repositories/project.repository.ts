import { Observable, delay, of } from "rxjs";
import { Project } from "../store/dashboard.state";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ProjectRepository {
    public loadProjects(): Observable<Project[]> {
        const projects: Project[] = [
            {
                id: 101,
                name: "API Assistant",
                createOps: 10,
                readOps: 22,
                updateOps: 33,
                deleteOps: 22,
                storageSize: 33
            }
        ]
        return of(projects).pipe(delay(2000))
    }
}