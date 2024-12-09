import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../blog-posts/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-posts/models/blogpost-model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  blogs$?:Observable<BlogPost[]>;
  constructor(private blogpostservice:BlogpostService){

  }
  ngOnInit(): void {
    this.blogs$=this.blogpostservice.getAllBlogPosts();
  }
}
