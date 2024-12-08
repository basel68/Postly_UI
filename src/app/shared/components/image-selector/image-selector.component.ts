import { ImageSelectorService } from './image-selector.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/BlogImage';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit{
  file?:File;
  fileName:string='';
  title:string='';
  images$?:Observable<BlogImage[]>;
  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;
  constructor(private imageSelectorService:ImageSelectorService) {

  }
  ngOnInit(): void {
    this.images$=this.imageSelectorService.getAllImages();
  }
  onFileUploadChange(event:Event){
    const element=event.currentTarget as HTMLInputElement;
    this.file=element.files?.[0];
  }
  selectImage(image:BlogImage){
    this.imageSelectorService.selectImage(image);
  }
  onFormSubmit(){
    if(this.file && this.fileName!=='' && this.title!==''){
      this.imageSelectorService.uploadImage(this.file,this.fileName,this.title).subscribe({
        next:(response)=>{
        this.images$=this.imageSelectorService.getAllImages();
        this.imageUploadForm?.reset();
       }
      });
    }
  }
}
