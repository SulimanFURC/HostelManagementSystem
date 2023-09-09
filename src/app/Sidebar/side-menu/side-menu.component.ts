import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  sidebar: boolean = true;


  constructor(private router: Router) { }

  isActive(routePath: string): boolean {
    return this.router.isActive(routePath, false);
  }

  toogleSidebar(side: boolean) {
    this.sidebar = side;
  }

  ngOnInit(): void {
    
  }



}
