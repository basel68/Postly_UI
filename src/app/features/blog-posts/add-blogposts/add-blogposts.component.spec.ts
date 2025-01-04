import { ImageSelectorService } from './../../../shared/components/image-selector/image-selector.service';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { AddBlogpostsComponent } from './add-blogposts.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { of } from 'rxjs';
import { MOCK_BLOG_POSTS, MOCK_CATEGORIES, MOCK_IMAGES } from '../../../db-mock';
import { BlogpostService } from '../services/blogpost.service';
import { CategoryService } from '../../categories/services/category.service';

fdescribe('AddBlogpostsComponent', () => {
  let component: AddBlogpostsComponent;
  let fixture: ComponentFixture<AddBlogpostsComponent>;
  let blogpostServiceSpy: jasmine.SpyObj<BlogpostService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let imageselectorServiceSpy:jasmine.SpyObj<ImageSelectorService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async () => {
  blogpostServiceSpy= jasmine.createSpyObj('BlogpostService', ['getAllBlogPosts','addBlogPost']);
  categoryServiceSpy= jasmine.createSpyObj('CategoryService', ['getAllCategories']);
  imageselectorServiceSpy=jasmine.createSpyObj('ImageSelectorService', ['selectImageService','getAllImages']);
  routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  blogpostServiceSpy.getAllBlogPosts.and.returnValue(of(MOCK_BLOG_POSTS));
  categoryServiceSpy.getAllCategories.and.returnValue(of(MOCK_CATEGORIES));
  imageselectorServiceSpy.selectImageService.and.returnValue(of(MOCK_IMAGES[0]));
  imageselectorServiceSpy.getAllImages.and.returnValue(of(MOCK_IMAGES));

    await TestBed.configureTestingModule({
      imports: [
        AddBlogpostsComponent,
        RouterModule.forRoot([]),
        CommonModule,
        MarkdownModule.forRoot()
      ],
      providers:[
        provideHttpClient(withInterceptorsFromDi()),
        { provide: BlogpostService, useValue: blogpostServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: ImageSelectorService, useValue: imageselectorServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlogpostsComponent);
    component = fixture.componentInstance;
    blogpostServiceSpy=TestBed.inject(BlogpostService) as jasmine.SpyObj<BlogpostService>
    categoryServiceSpy=TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>
    imageselectorServiceSpy=TestBed.inject(ImageSelectorService) as jasmine.SpyObj<ImageSelectorService>
    fixture.detectChanges();
  });

  it('should create add blog post component', () => {
    expect(component).toBeTruthy();
  });

  it('should display all available categories ', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(categoryServiceSpy.getAllCategories).toHaveBeenCalled();
    component.categories$?.subscribe(categories=>{
      expect(categories).toBe(MOCK_CATEGORIES);
    });
    flush();
  }));
  it('should display image selected and image modal closed',() => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(imageselectorServiceSpy.selectImageService).toHaveBeenCalled();
    expect(component.model.featuredImageUrl).toBe(MOCK_IMAGES[0].url);
    expect(component.isImageSelectorVisible).toBeFalsy();
  });

  it('should navigate to /admin/blogposts after successful form submission', () => {
    // Arrange: Mock the BlogpostService to simulate successful submission
    blogpostServiceSpy.addBlogPost.and.returnValue(of(MOCK_BLOG_POSTS[0]));

    // Act: Call the onFormSubmit method
    component.onFormSubmit();

    // flush();
    // Assert: Check if navigateByUrl was called with the correct URL
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/admin/blogposts');
  });
});
