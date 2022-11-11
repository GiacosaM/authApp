import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/auth/interfaces/persona';
import { PersonaService } from 'src/app/auth/services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrls: ['./agregar-editar-persona.component.css']
})
export class AgregarEditarPersonaComponent implements OnInit {
  
  loading: boolean =false;
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';
  
  constructor(private fb: FormBuilder, 
    private _PersonaService: PersonaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute ) {

    this.form= this.fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z ]*$')
        
      ])],
      apellido: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z ]*$')
      
      ])],
      mail: ['', Validators.compose([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      telefono: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.pattern(/^[0-9]\d{9,11}$/)
      ])],
    })
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'))
    
  }
  ngOnInit(): void {
    if(this.id != 0) {
      this.operacion ="Editar";
      this.obtenerPersona(this.id);
    }
  }

  campoEsValido( campo: string) {
    return this.form.get(campo)?.invalid
    && this.form.get(campo)?.touched
  }

  obtenerPersona(id: number) {
    this.loading = true;
    this._PersonaService.getPersona(this.id).subscribe(data => {
      this.form.patchValue({
        nombre: data.name,
        apellido: data.lastname,
        mail: data.email,
        telefono: data.telefono
      })
      this.loading = false;
    })
  }

  agregarEditarPersona() {
    const persona: Persona = {
      name: this.form.value.nombre,
      lastname: this.form.value.apellido,
      email: this.form.value.mail,
      telefono: this.form.value.telefono
    }
    if (this.id != 0) {
        persona.id = this.id;
        this.editarPersona(this.id, persona);
      } else {
        this.agregarPersona(persona);
      }
  }

  editarPersona(id: number, persona: Persona) {
    this.loading = true;
    this._PersonaService.updatePersona(id, persona).subscribe(()=> {
      this.loading= false;
      this._PersonaService.mensajeExito('La Persona Fue Editada Exitosamente');
      this.router.navigate(['/dashboard']);
    })
  }

  agregarPersona(persona: Persona) {
      this._PersonaService.addPersona(persona).subscribe(data => {
      this._PersonaService.mensajeExito('La Persona Fue agregada Exitosamente');
      this.router.navigate(['/dashboard']);
    })
  }

}

