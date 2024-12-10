import { BlogpostService } from './../../blog-posts/services/blogpost.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../../blog-posts/models/blogpost-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule,FormsModule,MarkdownModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit{
  url:string|null=null;
  routeSubscription?:Subscription;
  blogPost$?:Observable<BlogPost>;
  constructor(private route:ActivatedRoute,private blogpostService:BlogpostService) {

  }
  ngOnInit(): void {
    this.routeSubscription=this.route.paramMap.subscribe({
      next:(params)=>{
        this.url=params.get("url");
      }
    })
    if(this.url){
      this.blogPost$=this.blogpostService.getBlogPostByUrl(this.url);
    }
  }


}
