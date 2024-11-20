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
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/admin/BlogPosts`,model);
  }
}
