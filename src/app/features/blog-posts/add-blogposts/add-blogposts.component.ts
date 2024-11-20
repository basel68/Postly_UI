import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-blogposts',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-blogposts.component.html',
  styleUrl: './add-blogposts.component.css'
})
export class AddBlogpostsComponent {
model:AddBlogPost;
constructor(private blogpostService:BlogpostService,private router:Router){
  this.model={
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
  }
}
onFormSubmit(){
  this.blogpostService.addBlogPost(this.model).subscribe(
    {
      next:(response)=>{
        this.router.navigateByUrl('/admin/blogposts')
      }
    }
  )
}
}
