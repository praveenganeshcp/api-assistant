import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, delay, of } from "rxjs";
import { AuthUser } from "../accounts.types";

@Injectable({
    providedIn: "root"
})
export class AccountsRepository {
    constructor(
        private http: HttpClient
    ) {}

    private get baseURL(): string {
        return "http://localhost:3000/";
    }

    public fetchUserProfile(): Observable<AuthUser> {
        return this.http.get<AuthUser>(`${this.baseURL}api/v6/accounts/profile`, {withCredentials: true}).pipe(
        )
    }

    public login(emailId: string, password: string) {
        return this.http.post<AuthUser>(`${this.baseURL}api/v6/accounts/login`, {emailId, password}, {
            withCredentials: true
        })
    }

    public logout() {
        return this.http.post<void>(`${this.baseURL}api/v6/accounts/logout`, {}, {withCredentials: true})
    }
}