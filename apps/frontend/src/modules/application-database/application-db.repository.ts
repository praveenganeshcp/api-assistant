import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { CRUDActionDefinition } from '@api-assistant/applications-crud-engine-core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationDatabaseRepository {
  private readonly httpClient = inject(HttpClient);

  fetchCollections(applicationId: string): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${environment.apiUrl}api/v6/applications/${applicationId}/collections`
    );
  }

  executeQuery(applicationId: string, actionDef: CRUDActionDefinition) {
    return this.httpClient.post<unknown>(
      `${environment.apiUrl}api/v6/applications/${applicationId}/queries`,
      actionDef
    );
  }
}
