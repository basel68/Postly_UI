import { UpdateCategoryRequest } from './../models/update-category-request.model';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Category } from '../models/Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {

   }

  addCategory(model:AddCategoryRequest):Observable<void>{
      return this.http.post<void>(`${environment.apiBaseUrl}/admin/Categories?addAuth=true`,model);
  }
  getAllCategories(query?:string,sortBy?:string,sortDirection?:string,pageNumber?:number,pageSize?:number):Observable<Category[]>{
    let params =new HttpParams();
    if(query){
      params=params.set('query',query);
    }
    if(sortBy&&sortDirection){
      params=params.set('sortBy',sortBy);
      params=params.set('sortDirection',sortDirection);
    }
    if(pageNumber&&pageSize){
      params=params.set('pageNumber',pageNumber);
      params=params.set('pageSize',pageSize);
    }
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/admin/Categories`,{
      params:params
    });
  }
  getCategoryById(id:string):Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/admin/Categories/${id}`);
  }
  getCategoryCount():Observable<number>{
    return this.http.get<number>(`${environment.apiBaseUrl}/admin/Categories/count`);
  }
  updateCategory(id:string,model:UpdateCategoryRequest):Observable<Category>{
    return this.http.put<Category>(`${environment.apiBaseUrl}/admin/Categories/${id}?addAuth=true`,model);
  }
  deleteCategory(id:String){
    return this.http.delete<Category>(`${environment.apiBaseUrl}/admin/Categories/${id}?addAuth=true`);
  }
}
