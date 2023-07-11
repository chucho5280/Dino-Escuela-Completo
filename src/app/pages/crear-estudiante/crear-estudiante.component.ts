import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-crear-estudiante',
  templateUrl: './crear-estudiante.component.html',
  styleUrls: ['./crear-estudiante.component.css']
})
export class CrearEstudianteComponent implements OnInit {

  //propiedades
  estudianteForm: FormGroup;
  enviado = false;
  estudianteCarrera: any = [
    'Negocios Internacionales', 'Mecatronica', 'Desarrollo de software', 'Quimica', 'Taqueria'
  ]


  constructor (
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private estudianteService: EstudianteService
  ){
    this.mainForm();
  }

  
  ngOnInit(): void {
  }

  //Método para generar el formulario
  mainForm(){
    this.estudianteForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      carrera: ['', [Validators.required]],
      email: ['',
    [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ],
  ],
    usuario: ['',
    [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]

  ]
    })
  }

  //Método para asignar el departamento seleccionado por el usuario
  actualizarCarrera(d){
    this.estudianteForm.get('carrera').setValue(d,{
      onlySelf: true,
    })
  }

  //Método para acceder a los controles del formulario
  get myForm(){
    return this.estudianteForm.controls;
  }


  //Método que se ejecuta cuando el usuario hace el submit
  onSubmit(){
    this.enviado = true;
    if(!this.estudianteForm.valid){
      return false;
    } else {
      return this.estudianteService.agregarEstudiante(this.estudianteForm.value)
      .subscribe({
        complete: () => {
          console.log('Estudiante agregado correctamente')
          this.ngZone.run(() => this.router.navigateByUrl('/listar-estudiantes'));
        },
        error:(e)=>{
          console.log(e);
        },
      })
}
}

}
