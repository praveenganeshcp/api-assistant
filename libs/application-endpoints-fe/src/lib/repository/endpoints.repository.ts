import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Endpoint, MinimalEndpointInfo } from '../types';
import { API_BASE_URL } from '@api-assistant/commons-fe';

@Injectable({
  providedIn: 'root',
})
export class EndpointsFeRepository {
  private get baseUrl(): string {
    return `${this.apiBaseUrl}api/v6`;
  }

  constructor(
    private readonly http: HttpClient,
    @Inject(API_BASE_URL) private apiBaseUrl: string
  ) {}

  fetchAllEndpoints(applicationId: string) {
    return this.http.get<MinimalEndpointInfo[]>(
      `${this.baseUrl}/applications/${applicationId}/endpoints`,
      {
        withCredentials: true,
      }
    );
  }

  fetchEndpointDetail(applicationId: string, endpointId: string) {
    return this.http.get<Endpoint>(
      `${this.baseUrl}/applications/${applicationId}/endpoints/${endpointId}`,
      {
        withCredentials: true,
      }
    );
  }

  createEndpoint(
    applicationId: string,
    endpoint: Pick<
      Endpoint,
      | 'name'
      | 'description'
      | 'crud'
      | 'response'
      | 'url'
      | 'validations'
      | 'method'
    >
  ) {
    return this.http.post<Endpoint>(
      `${this.baseUrl}/applications/${applicationId}/endpoints`,
      endpoint,
      {
        withCredentials: true,
      }
    );
  }

  editEndpoint(
    applicationId: string,
    endpointId: string,
    endpoint: Pick<
      Endpoint,
      'name' | 'description' | 'crud' | 'response' | 'url' | 'method'
    >
  ) {
    return this.http.patch<Endpoint>(
      `${this.baseUrl}/applications/${applicationId}/endpoints/${endpointId}`,
      endpoint,
      {
        withCredentials: true,
      }
    );
  }

  deleteEndpointById(applicationId: string, endpointId: string) {
    return this.http.delete<void>(
      `${this.baseUrl}/applications/${applicationId}/endpoints/${endpointId}`,
      {
        withCredentials: true,
      }
    );
  }
}
