import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../interfaces/persona';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  
  private myAppUrl: string = environment.baseUrl;
  private myApiUrl: string = '/Person/getall';
  private myApuUrl1: string = '/Person/';

  constructor( private http: HttpClient,
    private _snackBar: MatSnackBar)
  { }

  getPersonas ():Observable<Persona[]> {
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token' || '')); 
    return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers});
  }

  getPersona(id: number):Observable<Persona> {
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token' || '')); 
    return this.http.get<Persona>(`${this.myAppUrl}${this.myApuUrl1}${id}`, {headers});
  }

  deletePersona(id: number): Observable<void> {
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token' || '')); 
    return this.http.delete<void>(`${this.myAppUrl}${this.myApuUrl1}${id}`, {headers})
  }

  addPersona(persona: Persona): Observable<Persona> {
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token' || '')); 
    return this.http.post<Persona>(`${this.myAppUrl}${this.myApuUrl1}`, persona, {headers});
  }

  updatePersona(id:number, persona: Persona):Observable<void> {
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token' || '')); 
    return this.http.put<void>(`${this.myAppUrl}${this.myApuUrl1}${id}`, persona, {headers});
  }
  
  mensajeExito(mensaje:string) {
    this._snackBar.open(mensaje, '', {
      duration: 2000,
      horizontalPosition: 'right',
    });
  }

}
