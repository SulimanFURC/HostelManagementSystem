import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  userlogin() {

    this.authService.setLoginStatus(true);

    this.authService.isLogin$.subscribe((login) => {
      if(login){
        this.router.navigate(['Dashboard']);
      } else {
        this.router.navigate(['Auth']);
      }
    })
  }

}
