import { HttpClient, HttpHeaders } from '@angular/common/http';
import { compileDeclareClassMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { User } from '../user';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl = 'https://inventory-service-84ll.onrender.com/User';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient) { }
  
  /**
   * 
   * @returns This will return all the user Data
   */
  GetAllUser(): Observable<User[]>{
    return this.http.get<User[]>(this.apiurl).pipe(catchError(this.errorHandler));
  }
  /**
   * 
   * @param code 
   * @returns 
   */
  GetUserByCode(code: any): Observable<User>{
    return this.http.get<User>(this.apiurl+'/'+code).pipe(catchError(this.errorHandler));
  }
  CreateUser(inputdata: any): Observable<User>{
    return this.http.post<User>(this.apiurl, inputdata).pipe(catchError(this.errorHandler));
  }
  UpdateUser(code: any, inputdata: any): Observable<User>{
    return this.http.put<User>(this.apiurl+'/'+code, inputdata).pipe(catchError(this.errorHandler));
  }

  errorHandler(error:any){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
