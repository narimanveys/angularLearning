import { Component } from '@angular/core';
import { AuthService } from './sevices/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService){
  }
  title = 'PWTestApp';
  ngOnInit(){
    const potentialToken = localStorage.getItem('auth-token')

    if(potentialToken !==null){
      this.auth.setToken(potentialToken)
    }
  }
}
