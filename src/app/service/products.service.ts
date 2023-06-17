import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Products } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productAPIURL = 'http://localhost:3000/Product';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient) { 
    
  }

  GetAllProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(this.productAPIURL).pipe(catchError(this.errorHandler));
  }

  CreateProduct(inputdata: any): Observable<Products>{
    console.log(' Creating product for '+inputdata.name);
    console.log(' Creating product for '+inputdata.quantity);
    console.log(' Creating product for '+inputdata.price);
    console.log(' Creating product for '+inputdata.description);
    console.log(' Creating product for '+inputdata.lastupdated);
    return this.http.post<Products>(this.productAPIURL, inputdata).pipe(catchError(this.errorHandler));
  }



  errorHandler(error:any){
    console.log("Going to error handler")
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
