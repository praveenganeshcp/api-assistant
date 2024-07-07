import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '@api-assistant/commons-fe';
import { FileObject, ApplicationDetails } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ApplicationDetailsRepository {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private apiBaseUrl: string
  ) {}

  private get baseUrl(): string {
    return `${this.apiBaseUrl}api/v6`;
  }

  fetchDetails(applicationId: string): Observable<ApplicationDetails> {
    return this.http
      .get<any>(`${this.baseUrl}/projects/${applicationId}`, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          const applicationData = response.projectDetail;
          return {
            _id: applicationData._id,
            name: applicationData.name,
            count: applicationData.metadata.count,
            api: {
              key: applicationData.metadata.apiKey,
              lastGeneratedOn: applicationData.metadata.apiKeyLastGeneratedOn,
            },
          };
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
    });
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
        path: path,
      },
    });
  }
}
