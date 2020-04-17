import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Transaction, SearchUser, TransactionCreationResult, NewTransaction } from '../shared/interfaces';
import { LoggedUserInfoService } from '../sevices/loggeduserinfo.service';
import { $resource } from '../shared/classes/constants';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {
    constructor(private http: HttpClient, private userInfoService: LoggedUserInfoService){

    }

    // type trans_token
    fetch(): Observable<Transaction[]>{
        // tslint:disable-next-line:no-string-literal
        return this.http.get<any>($resource['Transaction']()).pipe((map(x => x.trans_token)));
    }

    getUserList(filter: string) {
        // tslint:disable-next-line:no-string-literal
        return this.http.post<SearchUser[]>($resource['UserList'](), {filter});
        // tslint:disable-next-line:max-line-length
        // return this.http.post<SearchUser[]>('http://193.124.114.46:3001/api/protected/users/list', {filter}).pipe(catchError(()=> of([])))
    }

    postTransaction(newTransaction: NewTransaction){
        return this.http.post<{ trans_token: TransactionCreationResult}>
        // tslint:disable-next-line:no-string-literal
        ($resource['Transaction'](), newTransaction)
            .pipe((map(x => x.trans_token)))
            .pipe(
                tap(
                    (x) => {
                        const currentUser = this.userInfoService.userInfoSubject.getValue();
                        const updatedUser = {...currentUser, balance: x.balance };
                        this.userInfoService.userInfoSubject.next(updatedUser);
                    })
                );
    }
}
