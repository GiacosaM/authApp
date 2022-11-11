import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgregarEditarPersonaComponent } from './agregar-editar-persona/agregar-editar-persona.component';
import { VerPersonaComponent } from './ver-persona/ver-persona.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path:'', 
    
    children: [
      
      { path: 'agregarPersona', component: AgregarEditarPersonaComponent},
      { path: 'editarPersona/:id', component:AgregarEditarPersonaComponent },
      { path: 'verPersona/:id', component: VerPersonaComponent},
      { path: '', component: DashboardComponent},
      { path: '**', redirectTo: ''},
      

    ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
