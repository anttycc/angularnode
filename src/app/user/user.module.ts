import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { UserlistComponent } from './userlist/userlist.component';
import { UserRoutingModule } from './user-routing.module';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';



@NgModule({
  declarations: [UserlistComponent, AddEditUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NgbPaginationModule
  ]
})
export class UserModule { }
