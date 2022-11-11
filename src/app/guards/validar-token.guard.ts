import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {  tap } from 'rxjs/operators';

import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
constructor( private authService: AuthService,
              private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    
    
    if (!this.authService.validarToken()){
      this.router.navigateByUrl('/auth');
      
    }
    return true;
  
  }
  canLoad(): Observable<boolean> | boolean {
    if (!this.authService.validarToken()){
      this.router.navigateByUrl('/auth');
      
    }
    return true;
  }
}
