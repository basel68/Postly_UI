import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { environment } from '../../../../environments/environment';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpTestingController:HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
          providers: [
            AuthService,
            provideHttpClient(withInterceptorsFromDi()),
            provideHttpClientTesting()
          ]
        });
        service = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
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

  afterEach(() => {
    httpTestingController.verify();
  });
});
