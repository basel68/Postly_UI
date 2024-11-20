import { UpdateCategoryRequest } from './../models/update-category-request.model';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Category } from '../models/Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {

   }

  addCategory(model:AddCategoryRequest):Observable<void>{
      return this.http.post<void>(`${environment.apiBaseUrl}/admin/Categories`,model);
  }
  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/admin/Categories`);
  }
  getCategoryById(id:string):Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/admin/Categories/${id}`);
  }
  updateCategory(id:string,model:UpdateCategoryRequest):Observable<Category>{
    return this.http.put<Category>(`${environment.apiBaseUrl}/admin/Categories/${id}`,model);
  }
  deleteCategory(id:String){
    return this.http.delete<Category>(`${environment.apiBaseUrl}/admin/Categories/${id}`);
  }
}
