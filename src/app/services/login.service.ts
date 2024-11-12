import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

const API_URL = "http://localhost:8080/api/rest/auth/login";

@Injectable()
export class LoginService {
 
  constructor(private http:HttpClient) { }

  
  logIn(email:string,password:string) : Observable<any> {
    const body = { email, password };
    return this.http.post(API_URL, body);
  }

}