import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '@api-assistant/commons-fe';
import { FileObject, ProjectDetails } from '../types';

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
      .get<any>(
        `${this.baseUrl}/projects/${projectId}`,
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((response) => {
          const projectData = response.projectDetail;
          return {
            _id: projectData._id,
            name: projectData.name,
            count: projectData.metadata.count,
            api: {
              key: projectData.metadata.apiKey,
              lastGeneratedOn: projectData.metadata.apiKeyLastGeneratedOn
            }
          }
          return projectData
        })
      );
  }

  performCRUD(input: any, apiKey: string) {
    return this.http.post<any>(`${this.baseUrl}/core-engine/crud`, input, {
      headers: {
        'api-assist-auth': apiKey,
      },
    });
  }

  uploadFile(formData: FormData, apiKey: string) {
    return this.http.post(`${this.baseUrl}/core-engine/files`, formData, {
      headers: {
        'api-assist-auth': apiKey,
      },
    })
  }

  fetchCollections(apiKey: string) {
    return this.http.get<any>(`${this.baseUrl}/core-engine/collections`, {
      headers: {
        'api-assist-auth': apiKey,
      },
    });
  }

  fetchExplorerObjects(apiKey: string, path: string) {
    return this.http.get<FileObject[]>(`${this.baseUrl}/core-engine/files`, {
      headers: {
        'api-assist-auth': apiKey,
      },
      params: {
        'path': path
      }
    })
  }
}
