import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transaction.service';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchUser } from 'src/app/shared/interfaces';
import { LoggedUserInfoService } from 'src/app/sevices/loggeduserinfo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createtransaction',
  templateUrl: './createtransaction.component.html',
  styleUrls: ['./createtransaction.component.scss']
})
export class CreatetransactionComponent implements OnInit {

  userSearchControl: FormControl
  form: FormGroup = new FormGroup({
    name: new FormControl(
      this.activatedRoute.snapshot.queryParams['name'],
      [Validators.required]),
    amount: new FormControl(
      this.activatedRoute.snapshot.queryParams['amount'], 
        [
          Validators.required, 
          Validators.max(this.loggedUserInfoService.userInfoSubject.value.balance),
          Validators.min(0.1)
        ])
  })

  searchedUsersList$: Observable<SearchUser[]> = this.form.valueChanges.pipe(
    map(form => form.name),
    //останавливает дальнейшее прокидование обсервабла 
    debounceTime(500),
    //прокидывает только если значение отличается от старого 
    distinctUntilChanged(),
    //нужен чтобы брать текущего пользователя из формы и делать запрос на бэк для получения списка юзеров 
    switchMap(name => this.transactionService.getUserList(name))
  )
  constructor(private transactionService: TransactionsService, private loggedUserInfoService: LoggedUserInfoService, private activatedRoute: ActivatedRoute) {
    console.log('FROM CONSTRUCTOR')
    console.log(this.activatedRoute.snapshot.queryParams['name'])
  }

  onSubmit() {
    this.form.disable()
    this.transactionService.postTransaction(this.form.value).subscribe()
    console.log('FROM')
    console.log(this.activatedRoute.snapshot.queryParams['name'])
  }

  ngOnInit(): void {

  }
}
