import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/sevices/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit , OnDestroy{

  form: FormGroup;
  aSub: Subscription;
  errorMessage: string;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required,
         Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl(null, [Validators.required,
         Validators.minLength(6)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.errorMessage = '';
      if (params.registered){
        this.openSnackBar('You will be redirected to main page as authorized user');
        } else if (params.accessDenied) {
        this.openSnackBar('Please authorize in system');
        }else if (params.sessionFiled){
        this.openSnackBar('Please enter the system again, your session expired');
      }
    });
  }

  ngOnDestroy()  {
    if (this.aSub){
      this.aSub.unsubscribe();
    }
  }

  onSubmit(){
    this.errorMessage = '';
    this.form.disable();
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/transactions']),
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
        this.openSnackBar(this.errorMessage);
        this.form.enable();
      }
    );
  }

  openSnackBar(message){
    this.snackBar.open(message, '', {duration : 2000});
  }
}
