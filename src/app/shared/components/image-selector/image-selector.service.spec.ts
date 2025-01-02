import { TestBed } from '@angular/core/testing';
import { ImageSelectorService } from './image-selector.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BlogImage } from './../../models/BlogImage';
import { environment } from '../../../../environments/environment';
import { MOCK_IMAGES } from '../../../db-mock';

describe('ImageSelectorService', () => {
  let service: ImageSelectorService;
  let httpTestingController: HttpTestingController;



  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImageSelectorService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ImageSelectorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all images', () => {
    service.getAllImages().subscribe(images => {
      expect(images).withContext('Images are null').toBeTruthy();
      expect(images.length).toBe(2);
      expect(images[0].title).toBe('Image 1');
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/admin/Images`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_IMAGES);
  });

  it('should upload an image', () => {
    const mockFile = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
    const mockResponse: BlogImage = {
      id: '3',
      title: 'Test Image',
      fileName: 'test.jpg',
      fileExtension: 'jpg',
      url: 'https://example.com/test.jpg'
    };

    service.uploadImage(mockFile, 'Test Image', 'test.jpg').subscribe(image => {
      expect(image).withContext('Image not returned').toBeTruthy();
      expect(image.title).toBe('Test Image');
      expect(image.fileName).toBe('test.jpg');
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/admin/Images`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();
    expect(req.request.body.has('file')).toBeTrue();
    expect(req.request.body.has('title')).toBeTrue();
    expect(req.request.body.has('fileName')).toBeTrue();
    req.flush(mockResponse);
  });

  it('should select an image', () => {
    const mockImage: BlogImage = {
      id: '1',
      title: 'Image 1',
      fileName: 'image1.jpg',
      fileExtension: 'jpg',
      url: 'https://example.com/image1.jpg'
    };

    service.selectImage(mockImage);

    service.selectImageService().subscribe(selectedImage => {
      expect(selectedImage).toEqual(mockImage);
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
