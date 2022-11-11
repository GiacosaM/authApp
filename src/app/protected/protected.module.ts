import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { VerPersonaComponent } from './ver-persona/ver-persona.component';
import { AgregarEditarPersonaComponent } from './agregar-editar-persona/agregar-editar-persona.component';
import { MainComponent } from './main/main.component';
import { PersonaService } from '../auth/services/persona.service';




@NgModule({
  declarations: [
    DashboardComponent,
    VerPersonaComponent,
    AgregarEditarPersonaComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule 
  ],
  providers: [PersonaService]

})
export class ProtectedModule { }
