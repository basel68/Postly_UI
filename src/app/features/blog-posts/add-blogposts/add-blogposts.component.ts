import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../categories/services/category.service';
import { Category } from '../../categories/models/Category.model';
import { Observable, Subscription } from 'rxjs';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageSelectorService } from '../../../shared/components/image-selector/image-selector.service';



@Component({
  selector: 'app-add-blogposts',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MarkdownModule,
    MarkdownComponent, ImageSelectorComponent],
  templateUrl: './add-blogposts.component.html',
  styleUrl: './add-blogposts.component.css'
})
export class AddBlogpostsComponent implements OnInit ,OnDestroy{
isImageSelectorVisible:Boolean=false;
imageSubscription?:Subscription;
model:AddBlogPost;
categories$?:Observable<Category[]>
constructor(private blogpostService:BlogpostService,private router:Router,private categoryService:CategoryService,private imageService:ImageSelectorService){
  this.model={
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories:[]
  }
}
  ngOnInit(): void {
    this.categories$= this.categoryService.getAllCategories();
    this.imageSubscription= this.imageService.selectImageService().subscribe({
      next:(response)=>{
        if(this.model){
          this.model.featuredImageUrl=response.url;
          this.isImageSelectorVisible=false;
        }
      }
    })
  }
  openImageSelector(){
    this.isImageSelectorVisible=true;
  }
  closeImageSelector(){
    this.isImageSelectorVisible=false;
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
ngOnDestroy(): void {
    this.imageSubscription?.unsubscribe();
}
}
