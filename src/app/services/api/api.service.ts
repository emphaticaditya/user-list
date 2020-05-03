import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  Header: object;
  constructor(private http:HttpClient) { }

  getToken = () => {
    console.log('storage');
    let token = window.sessionStorage.getItem('token');
    console.log('%c getting token', 'color:yellow',token)
    return token;
  }

  returnHeaderHandler = () => {
    let token = this.getToken();
    return this.Header = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
  }

  setToken = (token:string) => {
    window.sessionStorage.setItem("token", token);
  }

  auth = (credentials:any) => {
    return this.http.post( "https://apertum-interview.herokuapp.com/api/user/login" , credentials, this.returnHeaderHandler())
    .pipe(
      map((res : any ) => {
        console.log(res);
        this.setToken(res.token);
        return res;
      }),
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    )
  }

  getUsers = () =>{
    return this.http.get("https://apertum-interview.herokuapp.com/api/users", this.returnHeaderHandler())
    .pipe(
      map((res : any) => {
        console.log(res);
        return res;
      }),
      catchError(err => {
        return throwError(err);
      })
    )

  }

}
