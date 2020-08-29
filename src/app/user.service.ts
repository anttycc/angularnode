import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel } from './user/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAllUsers(paginationData) {
    return this.http.get<{ status: boolean, items: Array<UserModel>, totalRecords: number }>(`${environment.API}/users?limit=${paginationData.pageSize}&page=${paginationData.page}`)
      .pipe(catchError((e) => {
        const message = e.error ? e.error.message : e.statusText;
        alert(message);
        return throwError(e);
      }));
  }
  getUser(id) {
    return this.http.get<UserModel>(`${environment.API}/user/${id}`).pipe(catchError((e) => {
      const message = e.error ? e.error.message : e.statusText;
      alert(message);
      return throwError(e);
    }));
  }
  createUser(data) {
    const fd = new FormData();
    Object.keys(data).forEach(key => {
      fd.append(key, data[key]);
    });
    return this.http.post(`${environment.API}/user`, fd, {
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError((e) => {
      const message = e.error ? e.error.message : e.statusText;
      alert(message);
      return throwError(e);
    }));
  }
  updateUser(id, data) {
    const fd = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'file' && typeof data[key] !== 'string') {
        fd.append(key, data[key]);

      } else {
        fd.append(key, data[key]);
      }
    });
    return this.http.put(`${environment.API}/user/${id}`, fd, {
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError((e) => {
      const message = e.error ? e.error.message : e.statusText;
      alert(message);
      return throwError(e);
    }));
  }
  deleteUser(id) {
    return this.http.delete<UserModel>(`${environment.API}/user/${id}`).pipe(catchError((e) => {
      const message = e.error ? e.error.message : e.statusText;
      alert(message);
      return throwError(e);
    }));
  }
  uploadImage(id, file) {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.put(`${environment.API}/user/${id}`, fd).pipe(catchError((e) => {
      const message = e.error ? e.error.message : e.statusText;
      alert(message);
      return throwError(e);
    }));
  }
}
