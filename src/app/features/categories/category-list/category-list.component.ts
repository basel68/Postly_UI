import { Category } from './../models/Category.model';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterModule,NgIf,NgFor,CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories$?:Observable<Category[]>;
  categoriesCount?:number;
  list:number[]=[];
  pageSize:number=5;
  pageNumber:number=1;
  constructor(private categoryService:CategoryService){

  }
  ngOnInit(): void {

    this.categoryService.getCategoryCount().subscribe({
      next:(count)=>{
        this.categoriesCount=count;
        this.list=new Array(Math.ceil(count/this.pageSize));
        this.categories$=this.categoryService.getAllCategories(undefined,undefined,undefined,this.pageNumber,this.pageSize);
      }
    })
  }
  onSearch(query:string){
    this.categories$=this.categoryService.getAllCategories(query);

  }
  sort(sortDirection:string){
    this.categories$=this.categoryService.getAllCategories(undefined,"name",sortDirection);
  }

  prevPage(){
    if(this.pageNumber-1<1){
      return
    }
    this.categories$=this.categoryService.getAllCategories(undefined,undefined,undefined,this.pageNumber-1,this.pageSize);

  }

  nextPage(){
    if(this.pageNumber+1>this.list.length){
      return
    }
    this.categories$=this.categoryService.getAllCategories(undefined,undefined,undefined,this.pageNumber+1,this.pageSize);

  }

  gotoPage(pageNumber:number){
    this.categories$=this.categoryService.getAllCategories(undefined,undefined,undefined,pageNumber,this.pageSize);
    this.pageNumber=pageNumber;
  }
}
