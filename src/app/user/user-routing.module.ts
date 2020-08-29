import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';


const routes: Routes = [
  {
    path: '',
    component: UserlistComponent

  },
  {
    path: 'add',
    component: AddEditUserComponent

  },
  {
    path: 'edit/:id',
    component: AddEditUserComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
