import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationMigration } from './types';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class MigrationsRepository {
  private readonly httpClient = inject(HttpClient);

  fetchAllMigrations(
    applicationId: string
  ): Observable<ApplicationMigration[]> {
    return this.httpClient.get<ApplicationMigration[]>(
      `${environment.apiUrl}api/v6/applications/${applicationId}/migrations`
    );
  }

  applyMigration(applicationId: string): Observable<void> {
    return this.httpClient.patch<void>(
      `${environment.apiUrl}api/v6/applications/${applicationId}/migrations/apply`,
      {}
    );
  }

  revertMigration(applicationId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}api/v6/applications/${applicationId}/migrations/revert`
    );
  }

  fetchMigration(
    applicationId: string,
    fileName: string
  ): Observable<ApplicationMigration & { logic: string }> {
    return this.httpClient.get<ApplicationMigration & { logic: string }>(
      `${environment.apiUrl}api/v6/applications/${applicationId}/migrations/${fileName}`
    );
  }

  updateMigrationLogic(
    applicationId: string,
    fileName: string,
    logic: string
  ): Observable<void> {
    return this.httpClient.patch<void>(
      `${environment.apiUrl}api/v6/applications/${applicationId}/migrations`,
      { logic, fileName }
    );
  }
}
