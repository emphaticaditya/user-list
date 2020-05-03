import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { UserComponent } from '../app/components/user/user.component'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'user-info',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
