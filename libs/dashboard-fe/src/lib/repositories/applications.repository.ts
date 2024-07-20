import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '@api-assistant/commons-fe';
import { Application } from '@api-assistant/application-core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsRepository {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private apiBaseURL: string
  ) {}

  public get apiUrl(): string {
    return this.apiBaseURL;
  }

  public fetchApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}api/v6/applications`, {
      withCredentials: true,
    });
  }

  public createApplication(name: string): Observable<Application> {
    return this.http.post<any>(
      `${this.apiUrl}api/v6/applications`,
      { name },
      {
        withCredentials: true,
      }
    );
  }
}
