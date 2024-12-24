import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../models/login-response.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model:LoginRequest;
  constructor(private authService:AuthService,private cookie:CookieService,private route:Router){
    this.model={
      email:'',
      password:''
    }
  }
  onFormSubmit(){
    this.authService.login(this.model).subscribe({
      next:(response)=>{
        this.cookie.set("Authorization",`Bearer ${response.token}`,undefined,"/",undefined,true,"Strict");
        this.authService.setUser({
          email:response.email,
          roles:response.roles
        });
        this.route.navigateByUrl("/");
      }
    })
  }
}
