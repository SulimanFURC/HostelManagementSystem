import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HostelManagement';
  isLogin?: boolean;

  
  constructor(private auth: AuthService) {
    this.auth.isLogin$.subscribe((res) => {
      this.isLogin = res;
    })
  }
}
