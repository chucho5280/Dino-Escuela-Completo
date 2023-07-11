import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-listar-estudiantes',
  templateUrl: './listar-estudiantes.component.html',
  styleUrls: ['./listar-estudiantes.component.css']
})
export class ListarEstudiantesComponent implements OnInit {
  //propiedades
  estudiantes:any = [];
  
  constructor(private estudianteService:EstudianteService){
    this.getEstudiantes();
  }

  ngOnInit(): void{

  }

  //metodo para obtener todos los empleados
  getEstudiantes(){
    this.estudianteService.getEstudiantes().subscribe((data)=>{
      this.estudiantes = data;
    })
  }

  //metodo para eliminar un empleado
  eliminarEstudiante(estudiante, index){
    if(window.confirm('¿Estas seguro que lo deseas eliminar?')){
      this.estudianteService.deleteEstudiante(estudiante._id)
      .subscribe((data) =>{
        this.estudiantes.splice(index,1);
      })
    }
  }
}

