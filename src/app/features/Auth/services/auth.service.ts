import { User } from './../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user=new BehaviorSubject<User|undefined>(undefined);
  constructor(private http:HttpClient,private cookies:CookieService) { }

  login(request:LoginRequest):Observable<LoginResponse>{
   return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/admin/Auth/login`,{
    email:request.email,
    password:request.password
   });
  }
  getUser():User|undefined{
    const email=localStorage.getItem('user-email');
    const roles=localStorage.getItem('user-roles');
    if(email&&roles){
      return {
        email:email,
        roles:roles.split(',')
      }
    }
    return undefined;
  }
  setUser(user:User){
    this.$user.next(user);
    localStorage.setItem("user-email",user.email);
    localStorage.setItem("user-roles",user.roles.join(","));
  }
  user():Observable<User|undefined>{
    return this.$user.asObservable();
  }
  logout(){
    localStorage.clear();
    this.cookies.delete('Authorization','/');
    this.$user.next(undefined);
  }
}
