import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserProfile } from '../models/accounts.types';
import { API_BASE_URL } from '@api-assistant/commons-fe';

@Injectable({
  providedIn: 'root',
})
export class AccountsRepository {
  constructor(
    private http: HttpClient, 
    @Inject(API_BASE_URL) private APIBaseURL: string
  ) {}

  private get baseURL(): string {
    return this.APIBaseURL;
  }

  public fetchUserProfile(): Observable<UserProfile> {
    return this.http
      .get<UserProfile>(`${this.baseURL}api/v6/accounts/profile`, {
        withCredentials: true,
      })
      .pipe();
  }

  public signup(emailId: string, password: string, username: string) {
    return this.http.post<UserProfile>(
      `${this.baseURL}api/v6/accounts/signup`,
      { emailId, password, username },
      {
        withCredentials: true,
      }
    );
  }

  public login(emailId: string, password: string) {
    return this.http.post<UserProfile>(
      `${this.baseURL}api/v6/accounts/login`,
      { emailId, password },
      {
        withCredentials: true,
      }
    );
  }

  public checkIfEmailIdRegistered(emailId: string) {
    return this.http
      .post<{ isEmailIdRegistered: boolean }>(
        `${this.baseURL}api/v6/accounts/is-emailid-registered`,
        { emailId },
        {
          withCredentials: true,
        }
      )
      .pipe(map((response) => response.isEmailIdRegistered));
  }

  public logout() {
    return this.http.post<void>(
      `${this.baseURL}api/v6/accounts/logout`,
      {},
      { withCredentials: true }
    );
  }

  public verifyAccount(verificationKey: string): Observable<UserProfile> {
    return this.http.patch<UserProfile>(
      `${this.baseURL}api/v6/accounts/verify-account`,
      { verificationKey },
      {
        withCredentials: true,
      }
    );
  }

  public sendPasswordResetLink(emailId: string) {
    return this.http.post(
      `${this.baseURL}api/v6/accounts/reset-password-link`,
      { emailId }
    );
  }
}
