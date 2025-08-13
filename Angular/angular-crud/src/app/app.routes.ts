import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MockTestComponent } from './pages/mock-test/mock-test.component';
import { UsersListComponent } from './pages/users/users-list/users-list.components';
import { UserFormComponent } from './pages/users/user-form/user-form.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mock', component: MockTestComponent },
  { path: 'usuarios', component: UsersListComponent },
  { path: 'usuarios/novo', component: UserFormComponent },
  { path: 'usuarios/:id/editar', component: UserFormComponent },
];
