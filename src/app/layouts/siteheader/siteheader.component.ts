import { Component, OnInit } from '@angular/core';
import { LoggedUserInfoService } from 'src/app/sevices/loggeduserinfo.service';
import { UserInfo } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/sevices/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-siteheader',
  templateUrl: './siteheader.component.html',
  styleUrls: ['./siteheader.component.scss']
})
export class SiteheaderComponent implements OnInit {
  userInfo: UserInfo ;
  constructor(private userInfoService: LoggedUserInfoService, private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.userInfoService.userInfoSubject.subscribe(user=>{
      this.userInfo = user
    })
  }

  logout(event: Event){
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
