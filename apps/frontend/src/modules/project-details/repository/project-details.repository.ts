import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProjectDetails } from '../store/state';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '@api-assistant/commons-fe';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailsRepository {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private apiBaseUrl: string
  ) {}

  private get baseUrl(): string {
    return `${this.apiBaseUrl}api/v6`;
  }

  fetchDetails(projectId: string): Observable<ProjectDetails> {
    return this.http
      .get<{ projectDetail: ProjectDetails }>(
        `${this.baseUrl}/projects/${projectId}`,
        {
          withCredentials: true,
        }
      )
      .pipe(map((response) => response.projectDetail));
  }

  performCRUD(input: any, apiKey: string) {
    console.log(input);
    return this.http.post<any>(`${this.baseUrl}/core-engine/crud`, input, {
      headers: {
        'api-assist-auth': apiKey,
      },
    });
  }
}
