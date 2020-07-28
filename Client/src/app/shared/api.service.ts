import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint: string = 'http://localhost:3001/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

AddEmployee(data: Employee): Observable<any> {
  let API_URL = `${this.endpoint}/add-employee`;
  return this.http.post(API_URL, data)
    .pipe(
      catchError(this.errorMgmt)
    )
}


GetEmployees() {
  return this.http.get(`${this.endpoint}`);
}


GetEmployee(id): Observable<any> {
  let API_URL = `${this.endpoint}/read-employee/${id}`;
  return this.http.get(API_URL, { headers: this.headers })
    .pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
}


UpdateEmployee(id, data): Observable<any> {
  let API_URL = `${this.endpoint}/update-employee/${id}`;
  return this.http.put(API_URL, data, { headers: this.headers })
    .pipe(
      catchError(this.errorMgmt)
    )
}

DeleteEmployee(id): Observable<any> {
  var API_URL = `${this.endpoint}/delete-employee/${id}`;
  return this.http.delete(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
}

 
errorMgmt(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}

}
