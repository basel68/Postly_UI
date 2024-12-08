import { BlogPost } from './../models/blogpost-model';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogpostService } from '../services/blogpost.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit {
  blogPosts$?:Observable<BlogPost[]>
  constructor(private blogpostService:BlogpostService){

  }
  ngOnInit(): void {
    this.blogPosts$=this.blogpostService.getAllBlogPosts();
  }



}
