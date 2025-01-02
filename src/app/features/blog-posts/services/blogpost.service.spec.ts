import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BlogpostService } from './blogpost.service';
import { BlogPost } from '../models/blogpost-model';
import { AddBlogPost } from '../models/add-blogpost-model';
import { UpdateBlogPost } from '../models/update-blogpost-model';
import { environment } from '../../../../environments/environment';
import { MOCK_BLOG_POSTS } from '../../../db-mock';



describe('BlogpostService', () => {
  let service: BlogpostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BlogpostService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BlogpostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all blog posts', () => {
    service.getAllBlogPosts().subscribe(blogPosts => {
      expect(blogPosts).withContext('No blog posts returned').toBeTruthy();
      expect(blogPosts.length).withContext('Incorrect number of blog posts').toBe(3);
      expect(blogPosts[0].title).toBe('Understanding Angular');
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/admin/BlogPosts`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_BLOG_POSTS);
  });

  it('should retrieve a blog post by ID', () => {
    service.getBlogPostById(MOCK_BLOG_POSTS[0].id).subscribe(blogPost => {
      expect(blogPost).withContext('Blog post not returned').toBeTruthy();
      expect(blogPost.id).toBe('1');
      expect(blogPost.title).toBe('Understanding Angular');
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/admin/BlogPosts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_BLOG_POSTS[0]);
  });

  it('should retrieve a blog post by URL', () => {
    service.getBlogPostByUrl(MOCK_BLOG_POSTS[1].urlHandle).subscribe(blogPost => {
      expect(blogPost).withContext('Blog post not returned').toBeTruthy();
      expect(blogPost.urlHandle).toBe('mastering-rxjs');
      expect(blogPost.title).toBe('Mastering RxJS');
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/admin/BlogPosts/mastering-rxjs`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_BLOG_POSTS[1]);
  });

  it('should add a new blog post', () => {
    const newPost: AddBlogPost = {
      title: 'New Post',
      shortDescription: 'Short description for the new post',
      content: 'This is a new post',
      featuredImageUrl: 'https://example.com/images/new-post.png',
      urlHandle: 'new-post',
      author: 'Author Name',
      publishedDate: new Date(),
      isVisible: true,
      categories: ['1', '2']
    };

    service.addBlogPost(newPost).subscribe(blogPost => {
      expect(blogPost).withContext('No blog post returned').toBeTruthy();
      expect(blogPost.title).toBe('New Post');
      expect(blogPost.shortDescription).toBe('Short description for the new post');
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/admin/BlogPosts?addAuth=true`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPost);
    req.flush({ id: '3', ...newPost });
  });

  it('should update a blog post', () => {
    const updates: UpdateBlogPost = {
      title: 'Updated Title',
      shortDescription: 'Updated short description',
      content: 'Updated content',
      featuredImageUrl: 'https://example.com/images/updated-post.png',
      urlHandle: 'updated-title',
      author: 'Updated Author',
      publishedDate: new Date(),
      isVisible: false,
      categories: ['3', '4']
    };

    service.updateBlogPost('2', updates).subscribe(blogPost => {
      expect(blogPost).withContext('Updated blog post not returned').toBeTruthy();
      expect(blogPost.title).toBe('Updated Title');
      expect(blogPost.shortDescription).toBe('Updated short description');
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/admin/BlogPosts/2?addAuth=true`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updates);
    req.flush({ ...MOCK_BLOG_POSTS[1], ...updates });
  });

  it('should delete a blog post', () => {
    service.deleteBlogPost('1').subscribe(response => {
      expect(response).withContext('Deleted blog post not returned').toBeTruthy();
      expect(response.id).toBe('1');
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/admin/BlogPosts/1?addAuth=true`);
    expect(req.request.method).toBe('DELETE');
    req.flush(MOCK_BLOG_POSTS[0]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
