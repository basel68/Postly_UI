import { UpdateBlogPost } from './../models/update-blogpost-model';
import { HttpClient } from '@angular/common/http';
import { AddBlogPost } from './../models/add-blogpost-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost-model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http:HttpClient) { }
  addBlogPost(model:AddBlogPost):Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/admin/BlogPosts?addAuth=true`,model);
  }
  getAllBlogPosts():Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/admin/BlogPosts`);
  }
  getBlogPostById(id:string):Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/admin/BlogPosts/${id}`);
  }
  getBlogPostByUrl(url:string):Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/admin/BlogPosts/${url}`);
  }
  updateBlogPost(id:string,newModel:UpdateBlogPost){
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/admin/BlogPosts/${id}?addAuth=true`,newModel);
  }
  deleteBlogPost(id:string){
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/admin/BlogPosts/${id}?addAuth=true`);
  }
}

