import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

const API_URL = "http://localhost:8080/api/user";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable()
export class UserService {
 
  constructor(private http:HttpClient) { }

  user:any;

  getAll() : Observable<any> {
    return this.http.get(API_URL+'/all');
  }

  getById(id:number) : Observable<any> {
    console.log("search id="+ id);
    return this.http.get(API_URL +'/'+ id);
  }
  search(name:string,page:number,size:number) : Observable<any> {
    
    return this.http.get(API_URL+'?nombre='+name+'&page='+page+'&size='+size);

  }

  save(
    email: string,
    name: string,
    password: string,
    status: string) : Observable<any> {
      const body = { email: email, name: name, password: password, status: status ,roles: [] };
      
      return this.http.post<any>(API_URL,body,httpOptions);
    }

  edit(id: string,email: string,name: string,password: string, status: string) : Observable<any> {

    
    const body = { id: id,email: email, name: name, password: password, status: status };
    return this.http.put<any>(API_URL +'/'+ id ,body,httpOptions);
  }

  delete(id:number) : Observable<any> {
    return this.http.delete<any>(API_URL +'/'+ id,httpOptions);
  }

}