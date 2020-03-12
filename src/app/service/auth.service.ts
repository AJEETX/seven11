import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserInfo } from '../model';
import { map } from 'rxjs/operators';
import {Config} from '../../configuration/config';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error=''
  baseUrl:string=Config.baseUrl+ "users"
  constructor(private http:HttpClient) { }
  login(username:string,password:string){
    return this.http.post<any>(this.baseUrl+ '/authenticate',{ username, password })
    .pipe(map(user => {
      if (user && user.token) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('username', user.username);
          localStorage.setItem('user', user.firstName+' '+user.lastName);
          localStorage.setItem('roles', user.roles);
          localStorage.setItem('userId', user.userId);
          localStorage.setItem('location', user.location);
      }
      return user;
  },
      error => {
          this.error = error;
      }))
  }
  getUserById(){
    var id=this.getUserId();
    console.log(this.baseUrl)
    var user= this.http.get<User>(this.baseUrl+'/'+id)
    return user;
  }
  getToken(): string {
    console.log(this.baseUrl)
    return localStorage.getItem('token');
  }
  getUserId(): string {
    console.log(this.baseUrl)
    return localStorage.getItem('userId');
  }  
  loggedIn(){
    console.log(this.baseUrl)
    return !!localStorage.getItem('token')
  }
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('username')
    localStorage.removeItem('roles')
    localStorage.removeItem('id')
  }
  register(firstname:string,lastname:string, username:string,location:string, password:string){
    return this.http.post<any>(this.baseUrl+ '/register',{ firstname,lastname, username,location, password })
    }
  update(user:UserInfo){
    // localStorage.removeItem('user')
    localStorage.setItem('user', user.firstname+' '+user.lastname);
    console.log(this.baseUrl)
    return this.http.put(this.baseUrl+'/'+user.Id,user);
  }
}
