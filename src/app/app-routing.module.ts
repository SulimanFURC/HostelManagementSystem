import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: '', redirectTo: '/Auth', pathMatch: 'full'  
  },
  // { 
  //   path: '', redirectTo: '/Dashboard', pathMatch: 'full'  
  // },
  { 
    path: 'Auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule), 
  },
  { 
    path: 'Dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), 
  },
  { 
    path: 'Rooms',
    canActivate: [AuthGuard],
    loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule), 
  },
  { 
    path: 'Rent',
    canActivate: [AuthGuard],
    loadChildren: () => import('./rent/rent.module').then(m => m.RentModule), 
  },
  { 
    path: 'Persons',
    canActivate: [AuthGuard],
    loadChildren: () => import('./person/person.module').then(m => m.PersonModule), 
  },
  { 
    path: 'Expenses',
    canActivate: [AuthGuard],
    loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesModule), 
  },
  { 
    path: 'Settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule), 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
