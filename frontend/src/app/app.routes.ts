// frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';
// Import our new standalone component
import { ProjectListComponent } from './components/project-list/project-list';

import { ProjectFormComponent } from './components/project-form/project-form';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';

import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';

import { ProjectDetailComponent } from './components/project-detail/project-detail';


export const routes: Routes = [
  // When the path is empty (the homepage), display the ProjectListComponent
  { path: '', component: ProjectListComponent },
  // 2. the route for the submission page
  { path: 'submit', component: ProjectFormComponent },
  // the admin dashboard route
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
];
