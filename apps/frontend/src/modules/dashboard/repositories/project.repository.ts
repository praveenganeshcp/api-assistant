import { Observable, map } from 'rxjs';
import { Project } from '../store/dashboard.state';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '@api-assistant/commons-fe';

@Injectable({
  providedIn: 'root',
})
export class ProjectRepository {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private apiBaseURL: string
  ) {}

  public get apiUrl(): string {
    return this.apiBaseURL;
  }

  public loadProjects(): Observable<Project[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}api/v6/projects`, {
        withCredentials: true,
      })
      .pipe(
        map((projects) =>
          projects.map((project) => {
            const count = project.metadata.count;
            return {
              id: project._id,
              name: project.name,
              totalOperations: Object.keys(count).reduce(
                (acc, key) => count[key] + acc,
                0
              ),
              storageSize: project.metadata.storage,
              activeUsers: project.metadata.users,
              createdOn: new Date(project.createdOn),
              status: true,
            };
          })
        )
      );
  }

  public createProject(name: string): Observable<Project> {
    return this.http
      .post<any>(
        `${this.apiUrl}api/v6/projects`,
        { name },
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((project) => {
          const count = project.metadata.count;
          return {
            id: project._id,
            name: project.name,
            totalOperations: Object.keys(count).reduce(
              (acc, key) => count[key] + acc,
              0
            ),
            storageSize: project.metadata.storage,
            activeUsers: project.metadata.users,
            createdOn: new Date(project.createdOn),
            status: true,
          };
        })
      );
  }
}
