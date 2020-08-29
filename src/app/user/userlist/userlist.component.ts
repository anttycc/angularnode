import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user.model';
import { UserService } from 'src/app/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  page = 1;
  pageSize = 5;
  users: UserModel[] = [];
  apiUrl = environment.API;
  paginationData = {
    pageSize: 5,
    page: 1,
    totalRecords: 0
  }
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.user.getAllUsers(this.paginationData).subscribe(data => {
      this.users = data.items;
      this.paginationData.totalRecords = data.totalRecords;
    });
  }
  pageChange(page) {
    this.paginationData.page = page;
    this.getUser();
  }
  delete(id) {
    if (confirm('Are you sure to delete.?')) {
      this.user.deleteUser(id).subscribe(() => {
        this.getUser();
      });
    }
  }

}
