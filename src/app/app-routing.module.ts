import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanLoad } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { AgregarEditarPersonaComponent } from './protected/agregar-editar-persona/agregar-editar-persona.component';
import { VerPersonaComponent } from './protected/ver-persona/ver-persona.component';


const routes: Routes = [
  
    
      
  { path: 'auth', 
    loadChildren:() =>import ('./auth/auth.module').then( m=> m.AuthModule)}, 
  { 
    path: 'dashboard', 
    loadChildren:() =>import ('./protected/protected.module').then( m=> m.ProtectedModule), 
    canActivate:  [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
    
  { path: '**', 
  redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
