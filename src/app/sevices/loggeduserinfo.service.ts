import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfo } from '../shared/interfaces';
import { $resource } from '../shared/classes/constants';

@Injectable(
    {providedIn: 'root'}
)

export class LoggedUserInfoService {
    userInfoSubject = new BehaviorSubject<UserInfo>(null);
    constructor(private http: HttpClient){
    }

    getUserInfo(): Observable<UserInfo>{
        return this.http.get<any>($resource['UserInfo']()).pipe((map(x => x.user_info_token)));
    }

    handleUserAuthorize() {
          const currentUser: UserInfo = {id: 0, balance: 0, date: null, email: null, name: null} ;
          this.getUserInfo().subscribe(user => {
          currentUser.name = user.name;
          currentUser.email = user.email;
          currentUser.balance = user.balance;
          currentUser.id = user.id;
          this.userInfoSubject.next(currentUser);
          sessionStorage.setItem('userData', JSON.stringify(currentUser));
        });
      }
}
