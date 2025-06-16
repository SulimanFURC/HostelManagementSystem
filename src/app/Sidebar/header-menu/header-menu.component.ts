import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  @Output() sidebarMenu = new EventEmitter<boolean>();
  
  sidebarToggle: boolean = true;
  
  constructor(private authService: AuthService, private router: Router) { }

  toggleSidebar() {
    this.sidebarToggle = !this.sidebarToggle;
    this.sidebarMenu.emit(this.sidebarToggle);
  }

  ngOnInit(): void {

  }

  logout() {
    console.log("Logging out...");
    this.authService.logout();
    this.router.navigate(['/Auth']);
  }

  navigateToProfile() {
    this.router.navigate(['/Settings']);
  }
}
