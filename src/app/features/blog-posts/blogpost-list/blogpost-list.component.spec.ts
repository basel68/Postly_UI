import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogpostListComponent } from './blogpost-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MOCK_BLOG_POSTS } from '../../../db-mock';
import { of } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { By } from '@angular/platform-browser';

describe('BlogpostListComponent', () => {
  let component: BlogpostListComponent;
  let fixture: ComponentFixture<BlogpostListComponent>;
  let blogpostService: jasmine.SpyObj<BlogpostService>;

  beforeEach(async () => {
  const blogpostServiceSpy= jasmine.createSpyObj('BlogpostService', ['getAllBlogPosts']);
  blogpostServiceSpy.getAllBlogPosts.and.returnValue(of(MOCK_BLOG_POSTS))
    await TestBed.configureTestingModule({
      declarations:[],
      imports: [
        RouterModule.forRoot([]),
        CommonModule,
        BlogpostListComponent
      ],
      providers:[
        provideHttpClient(withInterceptorsFromDi()),
        {provide:BlogpostService,useValue:blogpostServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogpostListComponent);
    component = fixture.componentInstance;
    blogpostService=TestBed.inject(BlogpostService) as jasmine.SpyObj<BlogpostService>
    fixture.detectChanges();
  });

  it('should create blog post list component', () => {
    expect(component).toBeTruthy();
  });

  it('should load blogposts on init', () => {
    component.ngOnInit();

    fixture.detectChanges();

    expect(blogpostService.getAllBlogPosts).toHaveBeenCalled();

    const tableRows=fixture.nativeElement.querySelectorAll("tbody tr");

    expect(tableRows.length).toBe(MOCK_BLOG_POSTS.length);
  });
  it('should render categories as badges ', () => {
    component.ngOnInit();

    fixture.detectChanges();

    expect(blogpostService.getAllBlogPosts).toHaveBeenCalled();

    const badges=fixture.nativeElement.querySelectorAll(".badge");

    expect(badges.length).toBe(MOCK_BLOG_POSTS.reduce((acc,post)=>acc+post.categories.length,0));
  });

  it('should assign blog posts to blogPosts observable', (done) => {

    component.ngOnInit();

    component.blogPosts$?.subscribe(posts => {
      expect(posts).toEqual(MOCK_BLOG_POSTS);
      expect(posts.length).toBe(3);
      done();
    });
  });
  it('should have correct router link for Add BlogPost button', () => {
    const addButton = fixture.debugElement.query(By.css('a.btn-primary'));
    const routerLink = addButton.attributes['ng-reflect-router-link'];
    expect(routerLink).toBe('/admin/blogposts/add');
  });

  it('should have correct router link for Edit BlogPost button', () => {
    const addButton = fixture.debugElement.queryAll(By.css('a.btn-light'));
    const routerLink = addButton[0].attributes['ng-reflect-router-link'];
    expect(routerLink).toBe(`/admin/blogposts,${MOCK_BLOG_POSTS[0].id}`);
  });
});
