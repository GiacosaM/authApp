import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, resolveForwardRef } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  

  constructor( private http: HttpClient) { }

  login( email: string, password: string) {
    const url = `${ this.baseUrl}/acounts/login`;
    const body = {email, password };
    return this.http.post<AuthResponse>(url, body )
    .pipe(
      tap( resp => {
        localStorage.setItem('token', resp.token!)
        localStorage.setItem('valid', 'True');
        
      }),
      map( resp => resp.ok),
      catchError(err => of(err.error))
    )
    console.log('Este es el valo de valid' + localStorage.getItem('valid'));
  }

  validarToken():boolean {
    if (localStorage.getItem('valid')) {
      return true
    } else {
        return false
    }
    
    /*const url = `${ this.baseUrl}/Person/getall` ;
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token' || ''));
      
    return this.http.get<AuthResponse>(url, {headers:headers})
      .pipe(
        map ( resp => {
          return resp.ok!;
        }),
        catchError(err => of(false))
      )  */
    
    }

    logout() {
      localStorage.clear();
    }


}
