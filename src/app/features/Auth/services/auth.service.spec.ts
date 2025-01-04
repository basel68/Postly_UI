import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController:HttpTestingController
  let cookieService:CookieService
  beforeEach(() => {
    TestBed.configureTestingModule({
          providers: [
            AuthService,
            CookieService,
            provideHttpClient(withInterceptorsFromDi()),
            provideHttpClientTesting()
          ]
        });
        service = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
        cookieService=TestBed.inject(CookieService);
  });

  it('should login Successfully', () => {
    let loginMock:LoginRequest={
      email:"basel@gg.com",
      password:"123456"
    }
    service.login(loginMock).subscribe(response=>{
      expect(response).withContext("Login info should have been retrieved").toBeTruthy();
      expect(response.email).toBe(loginMock.email);
      expect(response.token).toBeTruthy();
      expect(response.roles).toBeTruthy();
    });
    const req=httpTestingController.expectOne(`${environment.apiBaseUrl}/admin/Auth/login`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(loginMock);
  });
  it('should return a user from localStorage', () => {
    localStorage.setItem('user-email', 'test@example.com');
    localStorage.setItem('user-roles', 'admin,editor');

    const user = service.getUser();

    expect(user).toBeTruthy();
    expect(user?.email).toBe('test@example.com');
    expect(user?.roles).toEqual(['admin', 'editor']);
  });

  it('should return undefined if localStorage values are missing', () => {
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-roles');

    const user = service.getUser();

    expect(user).toBeUndefined();
  });

  it('should set the user and save it in localStorage', () => {
    const mockUser = {
      email: 'test@example.com',
      roles: ['admin', 'editor']
    };

    service.setUser(mockUser);

    service.user().subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    expect(localStorage.getItem('user-email')).toBe('test@example.com');
    expect(localStorage.getItem('user-roles')).toBe('admin,editor');
  });

  it('should return the current user as an observable', () => {
    const mockUser = {
      email: 'test@example.com',
      roles: ['admin']
    };

    service.setUser(mockUser);

    service.user().subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  });

  it('should clear localStorage, delete the Authorization cookie, and reset the user', () => {
    const mockUser = {
      email: 'test@example.com',
      roles: ['admin']
    };

    service.setUser(mockUser);

    service.logout();

    expect(localStorage.getItem('user-email')).toBeNull();
    expect(localStorage.getItem('user-roles')).toBeNull();
    expect(cookieService.get('Authorization')).toBeFalsy();

    service.user().subscribe(user => {
      expect(user).toBeUndefined();
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
