import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

 
import { MiUsersComponent } from './mi-users/mi-users.component';
import { EditModelComponent } from './edit-model/edit-model.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'users', component: MiUsersComponent},
  { path: 'users/form/:id', component: EditModelComponent },
  { path: 'users/form', component: EditModelComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
