import { AddCategoryRequest } from './../models/add-category-request.model';
import { Category } from './../models/Category.model';
import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { getCategoryForPost, MOCK_CATEGORIES } from '../../../db-mock';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
describe('CategoryService', () => {
  let service: CategoryService;
  let httptestingcontroller:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        CategoryService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CategoryService);
    httptestingcontroller=TestBed.inject(HttpTestingController);
  });

  it('get all categories', () => {
    service.getAllCategories().subscribe(categories=>{
      expect(categories).withContext("no categories returned").toBeTruthy();
      expect(categories.length).withContext("incorrect number of categories").toBe(5);
      const secondCategory=categories.find(category=>category.id=="2");
      expect(secondCategory?.name).toBe("Health");
    });
    const req=httptestingcontroller.expectOne(`${environment.apiBaseUrl}/admin/Categories`);
    expect(req.request.method).toBe("GET");
    req.flush(
      MOCK_CATEGORIES
    );
  });

  it('get category by id', () => {
    service.getCategoryById(MOCK_CATEGORIES[0].id).subscribe(category=>{
      expect(category).withContext("category not returned").toBeTruthy();
      expect(category.id).toBe("1");
    });
    const req=httptestingcontroller.expectOne(`${environment.apiBaseUrl}/admin/Categories/1`);
    expect(req.request.method).toBe("GET");
    req.flush(
      MOCK_CATEGORIES[0]
    );
  });

  it('Add Category', () => {
    let category:AddCategoryRequest={
      name:"Node",
      urlHandle:"node"
    }
    service.addCategory(category).subscribe(category=>{
      expect(category).withContext("no category returned").toBeNull();
    });
    const req=httptestingcontroller.expectOne(request =>request.urlWithParams === `${environment.apiBaseUrl}/admin/Categories?addAuth=true`);
    expect(req.request.method).toBe("POST");
    req.flush(null);
  });

  it('Update Category', () => {
    let updates:UpdateCategoryRequest={
      name:"React",
      urlHandle:"react"
    }
    service.updateCategory("4",updates).subscribe(category=>{
      expect(category).withContext("updated category not returned").toBeTruthy();

    });
    const req=httptestingcontroller.expectOne(request =>request.urlWithParams === `${environment.apiBaseUrl}/admin/Categories/4?addAuth=true`);
    expect(req.request.method).toBe("PUT");
    expect(req.request.body.name).withContext("name in requested body not the same as the requested update").toBe(updates.name);
    expect(req.request.body.urlHandle).withContext("urlHandle in requested body not the same as the requested update").toBe(updates.urlHandle);
    req.flush({
      ...MOCK_CATEGORIES[3],
      ...updates
    });
  });

  it('Delete Category', () => {
    service.deleteCategory(MOCK_CATEGORIES[2].id).subscribe(category=>{
      expect(category).withContext("deleted category not returned").toBeTruthy();
      expect(category.id).toBe("3");
    });
    const req=httptestingcontroller.expectOne(request =>request.urlWithParams === `${environment.apiBaseUrl}/admin/Categories/${MOCK_CATEGORIES[2].id}?addAuth=true`);
    expect(req.request.method).toBe("DELETE");
    req.flush(MOCK_CATEGORIES[2]);
  });

  afterEach(
    ()=>{
      httptestingcontroller.verify();
    }
  )
});
