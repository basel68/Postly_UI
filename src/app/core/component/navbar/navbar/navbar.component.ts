import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../features/Auth/services/auth.service';
import { User } from '../../../../features/Auth/models/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  user?:User;
  constructor(private authService:AuthService,private route:Router){

  }
  ngOnInit(): void {
    this.authService.user().subscribe({
      next:(response)=>{
        this.user=response;

      }
    })
    this.user=this.authService.getUser();
  }
  onLogout(){
    this.authService.logout();
    this.route.navigateByUrl('/');
  }
}
