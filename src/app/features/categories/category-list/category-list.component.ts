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
  constructor(private categoryService:CategoryService){

  }
  ngOnInit(): void {
    this.categories$=this.categoryService.getAllCategories();
  }


}
