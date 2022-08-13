import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CurrentUserInterface } from "src/shared/types/current-user.interface";
import { RegisterRequestInterface } from "../types/register-request.interface";
import { environment } from "src/environments/environment";
import { AuthResponseInterface } from "../types/auth-response.interface";

@Injectable()
export class AuthService {
    constructor( private http: HttpClient) {}
    public register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + 'users';
        return this.http.post<AuthResponseInterface>(url, data)
            .pipe(map((res: AuthResponseInterface) => res.user))
    }
}