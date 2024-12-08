import { BlogImage } from './../../models/BlogImage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageSelectorService {
  selectedImage:BehaviorSubject<BlogImage>=new BehaviorSubject<BlogImage>({
    id:'',
    fileExtension:'',
    fileName:'',
    url:'',
    title:''
  });
  constructor(private http:HttpClient) { }
  getAllImages():Observable<BlogImage[]>{
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/admin/Images`);
  }
  uploadImage(file:File,title:string,fileName:string):Observable<BlogImage>{
    var formData=new FormData()
    formData.append("file",file);
    formData.append("fileName",fileName);
    formData.append("title",title)
    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/admin/Images`,formData);
  }
  selectImage(image:BlogImage){
    this.selectedImage.next(image);
  }
  selectImageService():Observable<BlogImage>{
    return this.selectedImage.asObservable();
  }
}
