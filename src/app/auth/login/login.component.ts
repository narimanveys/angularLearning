import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/sevices/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit , OnDestroy{

  form: FormGroup
  aSub : Subscription
  errorMessage: string
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form= new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params)=> {
      this.errorMessage = '';
      if(params['registered']){
        console.log('You will be redirected to main page as authorized user')
      } else if(params['accessDenied']){
        console.log('Please authorize in system')
      }else if(params['sessionFiled']){
        console.log('Please enter the system again, your session expired')
      }
    })
  }

  ngOnDestroy()  {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    this.errorMessage = '';
    this.form.disable()
    this.aSub= this.auth.login(this.form.value).subscribe(
      ()=>this.router.navigate(['/transactions']),
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error
        console.warn(error.error)
        this.form.enable()
      }
    )
  }
}
