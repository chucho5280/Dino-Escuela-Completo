import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearEstudianteComponent } from './pages/crear-estudiante/crear-estudiante.component';
import { EditarEstudianteComponent } from './pages/editar-estudiante/editar-estudiante.component';
import { ListarEstudiantesComponent } from './pages/listar-estudiantes/listar-estudiantes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { EstudianteService } from './services/estudiante.service';


@NgModule({
  declarations: [
    AppComponent,
    CrearEstudianteComponent,
    EditarEstudianteComponent,
    ListarEstudiantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [EstudianteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
