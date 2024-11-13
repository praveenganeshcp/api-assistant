import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Application } from '@api-assistant/application-core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class ApplicationDetailsRepository {
  private readonly httpClient = inject(HttpClient);

  fetchApplicationById(applicationId: string): Observable<Application> {
    return this.httpClient.get<Application>(
      `${environment.apiUrl}api/v6/applications/${applicationId}`,
      {
        withCredentials: true,
      }
    );
  }

  deleteApplicationById(applicationId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}api/v6/applications/${applicationId}`,
      {
        withCredentials: true,
      }
    );
  }
}
