import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/auth/services/persona.service';
import { Persona } from 'src/app/auth/interfaces/persona';
import { Observable, timeInterval, timeout } from 'rxjs';

@Component({
  selector: 'app-ver-persona',
  templateUrl: './ver-persona.component.html',
  styleUrls: ['./ver-persona.component.css']
})
export class VerPersonaComponent implements OnInit {
  id: number;
  personas!: Persona;
  loading: boolean= false;
  

  constructor(private _personaService: PersonaService, private aRoute: ActivatedRoute) { 
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    
  }

  ngOnInit(): void {
    
    this.obtenerPersona();
  }

  obtenerPersona() {
    this.loading= true;
    this._personaService.getPersona(this.id).subscribe(data => {
      this.personas = data;
      this.loading = false;
    })
  }

}
