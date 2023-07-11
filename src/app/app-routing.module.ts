import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEstudianteComponent } from './pages/crear-estudiante/crear-estudiante.component';
import { EditarEstudianteComponent } from './pages/editar-estudiante/editar-estudiante.component';
import { ListarEstudiantesComponent } from './pages/listar-estudiantes/listar-estudiantes.component';

const routes: Routes = [
  {path: '', pathMatch:'full',redirectTo:'crear-empleado'},
  {path: 'crear-estudiante', component: CrearEstudianteComponent},
  {path: 'editar-estudiante/:id',component: EditarEstudianteComponent},
  {path: 'listar-estudiantes',component: ListarEstudiantesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
