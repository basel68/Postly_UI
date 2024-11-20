import { UpdateCategoryRequest } from './../models/update-category-request.model';
import { Category } from './../models/Category.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit,OnDestroy{
  id:string|null=null;
  category?:Category;
  paramsub?:Subscription
  updateCategorysub?:Subscription
  constructor(private route:ActivatedRoute,private categoryService:CategoryService,private router:Router ){

  }
  ngOnInit(): void {
    this.paramsub=this.route.paramMap.subscribe(
      {
        next:(params)=>{
          this.id=params.get('id');
          if(this.id){
            this.categoryService.getCategoryById(this.id).subscribe({
              next:(response)=>{
                this.category=response;
              }
            });
          }
        }

      }
    )
  }
  onDelete(){
    if(this.id){
      this.categoryService.deleteCategory(this.id).subscribe({
        next:(response)=>{
          this.router.navigateByUrl("/admin/categories")
        }
      });
    }
  }
  onFormSubmit():void{
   const updateCategoryRequest:UpdateCategoryRequest={
    name:this.category?.name ?? '',
    urlHandle:this.category?.urlHandle ?? ''
   }
    if(this.id){
      this.updateCategorysub=this.categoryService.updateCategory(this.id,updateCategoryRequest).subscribe({
        next:(response)=>{
          this.router.navigateByUrl("/admin/categories")
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.paramsub?.unsubscribe();
    this.updateCategorysub?.unsubscribe();
  }

}
