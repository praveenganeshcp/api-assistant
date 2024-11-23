import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../environments/environment.dev";
import { CRUDActionDefinition } from "@api-assistant/application-endpoints-core";

@Injectable({
  providedIn: "root",
})
export class ApplicationDatabaseRepository {
  private readonly httpClient = inject(HttpClient);

  fetchCollections(applicationId: string): Observable<string[]> {
    return this.httpClient.get<{collectionNames: string[]}>(
      `${environment.apiUrl}api/v6/applications/${applicationId}/collections`
    ).pipe(
      map(response => response.collectionNames)
    )
  }

  executeQuery(applicationId: string, actionDef: CRUDActionDefinition) {
    return this.httpClient.post<unknown>(
      `${environment.apiUrl}api/v6/applications/${applicationId}/query`,
      actionDef
    );
  }
}
