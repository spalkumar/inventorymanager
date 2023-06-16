import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { Products } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiurl = 'http://localhost:3000/Product';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient) { 
    
  }

  GetAllProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(this.apiurl).pipe(catchError(this.errorHandler));
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
