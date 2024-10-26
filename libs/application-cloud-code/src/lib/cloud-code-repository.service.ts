import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { API_BASE_URL } from "@api-assistant/commons-fe";

@Injectable({
    providedIn: 'root',
  })
  export class ApplicationCloudCodeRepository {
    private get baseUrl(): string {
      return `${this.apiBaseUrl}api/v6`;
    }
  
    constructor(
      private readonly http: HttpClient,
      @Inject(API_BASE_URL) private apiBaseUrl: string
    ) {}
  
    fetchAllRequestHandlers(applicationId: string) {
      return this.http.get<string[]>(
        `${this.baseUrl}/applications/${applicationId}/cloud-code/handlers`,
        {
          withCredentials: true,
        }
      );
    }
}