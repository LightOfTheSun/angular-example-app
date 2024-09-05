import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full'
  },
  {
    path: 'users-table',
    loadComponent: () => import('./features/users-table/users-table.component').then(m => m.UsersTableComponent)
  },
  { path: '**', redirectTo: '/users-table' }
];
