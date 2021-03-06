import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/sevices/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;
  errorMessage: string;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl(null, [Validators.required,
          Validators.minLength(6)])
    });
  }

  ngOnDestroy(){
    if (this.aSub){
      this.aSub.unsubscribe();
    }
  }

  onSubmit(){
    this.errorMessage = '';
    this.form.disable();
    this.aSub = this.auth.register(this.form.value).subscribe(
      () => this.router.navigate(['/transactions']),
      error => {
        this.errorMessage = error.error;
        console.warn(error.error);
        this.form.enable();
      }
    );
  }
}
