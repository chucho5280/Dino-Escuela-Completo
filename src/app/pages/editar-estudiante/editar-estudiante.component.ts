import { Component, OnInit } from '@angular/core';
import {Estudiante} from 'src/app/models/estudiante';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms'
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.css']
})
export class EditarEstudianteComponent implements OnInit{

  //propiedades
  estudianteForm: FormGroup;
  enviado = false;
  estudianteCarrera: any = [
    'Negocios Internacionales', 'Mecatronica', 'Desarrollo de software', 'Quimica', 'Taqueria'
  ]

  editarForm: FormGroup;
  estudianteData:Estudiante[];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private estudianteService: EstudianteService,
    private actRoute: ActivatedRoute
  ){

  }
  ngOnInit():void{
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEstudiante(id);
  }


  //Método para generar el formulario
mainForm(){
  this.editarForm = this.formBuilder.group({
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
  this.editarForm.get('carrera').setValue(d,{
    onlySelf: true,
  })
}

//Método para acceder a los controles del formulario
get myForm(){
  return this.editarForm.controls;
}

//metodo para buscar al empleado que vamos a modificar
getEstudiante(id){
  this.estudianteService.getEstudiante(id).subscribe((data) => {
    this.editarForm.setValue({
      nombre: data['nombre'],
      carrera: data['carrera'],
      email: data['email'],
      usuario: data['usuario'],
  });
  })
}


//metodo que se ejecuta cuando se envia el formulario 
onSubmit(){
  this.enviado = true;
  if(!this.editarForm.valid){
    return false;
  } else {
    if(window.confirm('¿estas seguro que deseas modificarlo?')){
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.estudianteService.updateEstudiante(id, this.editarForm.value)
      .subscribe({
        complete: () => {
          this.router.navigateByUrl('/listar-estudiantes');
          console.log('se actualizo correctamente');
        }
      })
    }
  }
}
}
