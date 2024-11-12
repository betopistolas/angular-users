import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {




  const authToken= localStorage.getItem('token');

  console.log(authToken);
  if(authToken != null){
    console.log("add token: "+authToken);
    const authReq = req.clone({
      setHeaders: {

        'Access-Control-Allow-Origin' : '*',
        Authorization: 'Bearer '+authToken
      }
    });
    return next(authReq);
  }

  return next(req);
};
