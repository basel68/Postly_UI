import { CategoryService } from './../../categories/services/category.service';
import { BlogpostService } from './../services/blogpost.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blogpost-model';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { Category } from '../../categories/models/Category.model';
import { UpdateBlogPost } from '../models/update-blogpost-model';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageSelectorService } from '../../../shared/components/image-selector/image-selector.service';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule, ImageSelectorComponent],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit,OnDestroy {
  isImageSelectorVisible:Boolean=false;
  model?:BlogPost;
  routeSubscription?:Subscription;
  imageSubscription?:Subscription;
  updateBlogPostSubscription?:Subscription;
  getBlogPostSubscription?:Subscription;
  deleteBlogPostSubscription?:Subscription;
  id:string|null=null;
  categories$?:Observable<Category[]>;
  selectedCategories?:string[];
  constructor(private route:ActivatedRoute,private blogpostService:BlogpostService,private categoryService:CategoryService,private router:Router,private imageService:ImageSelectorService){

  }
  onFormSubmit(){
    if(this.id && this.model){
    var updateBlogPostRequest:UpdateBlogPost={
      title:this.model.title,
      urlHandle:this.model.urlHandle,
      featuredImageUrl:this.model.featuredImageUrl,
      shortDescription:this.model.shortDescription,
      content:this.model.content,
      author:this.model.author ,
      categories:this.selectedCategories ?? [],
      publishedDate:this.model.publishedDate,
      isVisible:this.model.isVisible ,
     }

     this.updateBlogPostSubscription=this.blogpostService.updateBlogPost(this.id,updateBlogPostRequest).subscribe({
        next:(response)=>{
          this.router.navigateByUrl("/admin/blogposts")
        }
      });

    }
  }

  ngOnInit(): void {
    this.categories$= this.categoryService.getAllCategories();
    this.routeSubscription=this.route.paramMap.subscribe({
      next:(params)=>{
        this.id=params.get('id');
        if(this.id){
         this.getBlogPostSubscription=this.blogpostService.getBlogPostById(this.id).subscribe({
            next:(response)=>{
              this.model=response;
              this.selectedCategories=response.categories.map(x=>x.id);
            }
         });
        }
      }
    })
    this.imageSubscription= this.imageService.selectImageService().subscribe({
      next:(response)=>{
        if(this.model){
          this.model.featuredImageUrl=response.url;
          this.closeImageSelector();
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
  onDelete(){
    if(this.id){
     this.deleteBlogPostSubscription= this.blogpostService.deleteBlogPost(this.id).subscribe({
      next:(response)=>{
        this.router.navigateByUrl("/admin/blogposts");
      }
     });
    }
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSubscription?.unsubscribe();
  }


}
