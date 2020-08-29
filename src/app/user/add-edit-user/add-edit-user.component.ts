import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../user.model';
import { HttpEventType, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private user: UserService, private activatedROute: ActivatedRoute) { }
  userForm: FormGroup;
  progress: number;
  isEdit: boolean = false;
  userData: UserModel;
  ngOnInit(): void {
    this.initialiseForm();
    const userId = this.activatedROute.snapshot.paramMap.get('id');
    if (userId) {
      this.isEdit = true;
      this.user.getUser(userId).subscribe((data: any) => {
        this.userData = data.user;
        this.userForm.setValue({
          firstname: this.userData.firstname,
          lastname: this.userData.lastname,
          email: this.userData.email,
          mobileNumber: this.userData.mobileNumber,
          file: this.userData.profileImage || ''

        });
      });
    }
  }
  initialiseForm() {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      file: []

    });
  }
  saveUser() {
    if (!this.isEdit) {
      this.createUser();
    } else {
      this.editUser();
    }


  }
  private createUser() {
    this.user.createUser(this.userForm.value)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            setTimeout(() => {
              this.progress = 0;
              this.router.navigate(['/']);
            }, 1500);

        }
      });
  }
  private editUser() {
    this.user.updateUser(this.userData._id, this.userForm.value)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            setTimeout(() => {
              this.progress = 0;
              this.router.navigate(['/']);
            }, 1500);

        }
      });
  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userForm.patchValue({
      file: file || ''
    });
    this.userForm.get('file').updateValueAndValidity();
  }

}
