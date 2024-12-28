import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  var cookie=inject(CookieService);
  if (req.urlWithParams.includes('addAuth=true')) {

    const modifiedRequest = req.clone({
      setHeaders: {
        'Authorization': cookie.get('Authorization')
      }
    });

    // Passing the modified request to the next handler
    return next(modifiedRequest);
  }

  //passing the original request
  return next(req);
};




