import { Injectable } from '@angular/core';
import { User, RegisterUser } from '../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { LoggedUserInfoService } from './loggeduserinfo.service';
import { $resource } from '../shared/classes/constants';

@Injectable(
    {providedIn: 'root'}
)

export class AuthService{
    // tslint:disable-next-line:variable-name
    private id_token = null;
    private bearer = 'Bearer ';
    constructor(private http: HttpClient, private userInfoService: LoggedUserInfoService){
    }

    login(user: User): Observable<{id_token: string}>{
        // tslint:disable-next-line:no-string-literal
        return this.http.post<{id_token: string}>($resource['Login'](), user)
            .pipe(
                tap(
                    ({id_token}) => {
                        localStorage.setItem('auth-token', this.bearer.concat(id_token));
                        this.setToken(this.bearer.concat(id_token));
                        this.userInfoService.handleUserAuthorize();
                    }
                )
            );
    }

    register(registerUser: RegisterUser): Observable<{id_token: string}>{
        // tslint:disable-next-line:no-string-literal
        return this.http.post<{id_token: string}>($resource['Register'](), registerUser)
            .pipe(
                tap(
                    ({id_token}) => {
                        localStorage.setItem('auth-token', this.bearer.concat(id_token));
                        this.setToken(this.bearer.concat(id_token));
                        this.userInfoService.handleUserAuthorize();
                    }
                )
            );
    }

    setToken(token: string){
        this.id_token = token;
    }

    getToken(): string{
        return this.id_token;
    }

    isAuthenticated(): boolean {
        return !!this.id_token;
    }

    logout(){
        this.setToken(null);
        localStorage.clear();
    }
}
